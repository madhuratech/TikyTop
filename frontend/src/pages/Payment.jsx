import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'
import { API_URL, RAZORPAY_KEY, SITE_URL } from '../config'
import Razorpay from "../assets/icons/Razorpay.png"
import Paypal from "../assets/icons/Paypal.jpeg"

const platformConfig = {
  instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
  youtube:   { color: 'from-red-500 to-red-600',    name: 'YouTube',   bgColor: 'bg-gradient-to-br from-red-50 to-orange-50' },
  facebook:  { color: 'from-blue-600 to-blue-700',  name: 'Facebook',  bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
  tiktok:    { color: 'from-black to-gray-800',     name: 'TikTok',    bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50' },
}

const OrderPayment = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()

  //  Read state from QuantityPricing 
  const orderData = location.state || {}
  const {
    username,
    platform,
    selectedService,
    userdata,
    selectedPosts = [],
    orders        = [],
    totalPrice    = 0,
    appliedCoupon,
  } = orderData

  const [paying,     setPaying]     = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('razorpay') 

  const config = platformConfig[platform] || platformConfig.instagram

  //  Guard 
  useEffect(() => {
    if (!username || !userdata) {
      navigate('/' + platform, { replace: true })
      return
    }
    // Set the primary link for display
    if (orders.length > 0 && orders[0].link) {
      setProfileUrl(orders[0].link)
    }
  }, [])

  if (!username || !userdata) return null

  //  Total to charge 
  const total = totalPrice || 0

  // Load Razorpay SDK dynamically if not already loaded 
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true)
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload  = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  //  Main payment handler (exact flow you provided) 
  const handleRazorpayPayment  = async () => {
    if (paying) return
    setPaying(true)

    const loaded = await loadRazorpay()
    if (!loaded) {
      alert('Failed to load Razorpay. Please check your connection.')
      setPaying(false)
      return
    }

    try {
      // 1 — Create Razorpay order on backend
      let razorpayKey = RAZORPAY_KEY

      if (!razorpayKey) {
        const configResponse = await fetch(`${API_URL}/payment/razorpay/config`)
        const configData = await configResponse.json()
        razorpayKey = configData.keyId
      }

      if (!razorpayKey) {
        alert('Razorpay is not configured. Please contact support.')
        setPaying(false)
        return
      }

      const response = await fetch(`${API_URL}/payment/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          platform,
          username,
          orders,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        alert('Could not create payment order. Please try again.')
        setPaying(false)
        return
      }

      // 2 — Open Razorpay checkout
      const options = {
        key:       razorpayKey,
        amount:    data.order.amount,     
        currency:  'INR',
        name:   platform === 'youtube'
                ? 'YouTube Services'
                : platform === 'tiktok'
                 ? 'TikTok Services'
                : 'Instagram Services',
        description: selectedService?.name || 'SMM Service',
        order_id:  data.order.id,
        prefill: {
          name:  userdata?.username || username,
          email: '',
          contact: '',
        },
        theme: { color: '#7c3aed' },

        // 3 — On successful payment: verify on backend
        handler: async function (razorpayResponse) {
          try {
            const verifyRes = await fetch(`${API_URL}/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id:   razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature:  razorpayResponse.razorpay_signature,
                orders,
                amount:   total,
                platform,
                username,
              }),
            })

            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              alert('Payment Successful 🎉 Your order is being processed!')
              navigate('/Home')     // redirect to home / success page
            } else {
              alert('Payment verification failed. Contact support.')
            }
          } catch (err) {
            console.error('Verify error:', err)
            alert('Verification error. Contact support.')
          } finally {
            setPaying(false)
          }
        },

        modal: {
          ondismiss: () => setPaying(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment server error. Please try again.')
      setPaying(false)
    }
  }


  // handle Paypal 

const handlePaypalPayment = async () => {

  try {

    const response = await fetch(
      `${API_URL}/payment/paypal/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: totalPrice,
          orders,
          platform,
          username,
          returnUrl: `${SITE_URL}/complete`,
          cancelUrl: `${SITE_URL}/payment`,
        }),
      }
    );

    // IMPORTANT
    if (!response.ok) {

      const text = await response.text();
      console.log(text);

      throw new Error("Paypal API failed");
    }

    const data = await response.json();

    console.log("Paypal Response:", data);

    if (!data.success || !data.approvalUrl) {
      throw new Error("PayPal order creation failed");
    }

    // Redirect to PayPal
    window.location.href = data.approvalUrl;

  } catch (error) {

    console.log("Paypal Error:", error);

    alert("Paypal payment failed");
  }
};

  // Handle Paypal payment (placeholder)
  const handlePayment = () => {
  if (paymentMethod === "paypal") {
    handlePaypalPayment();
  } else {
    handleRazorpayPayment();
  }
};

  // JSX 
  return (
    <div className={`min-h-screen ${config.bgColor} py-8 px-4`}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md mb-4">
            <span className="text-sm text-gray-600">Final Step</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Powered by Razorpay — 100% secure</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Order info ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>

              {/* Orders list */}
              {orders.length > 0 ? (
                <div className="space-y-4 mb-8">
                  {orders.map((o, idx) => {
                    const serviceKey = Object.keys(o.order || {}).find(k => o.order[k] > 0)
                    const qty = serviceKey ? o.order[serviceKey] : 0
                    return (
                      <div key={idx} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-gray-900 capitalize">
                              {serviceKey} — {qty?.toLocaleString()} units
                            </div>
                            {o.link && (
                              <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                                🔗 {o.link}
                              </div>
                            )}
                          </div>
                          <div className={`text-sm font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-yellow-50 rounded-2xl p-6 mb-8 text-center text-yellow-700">
                  No order data found. Please go back and select a service.
                </div>
              )}

              {/* Razorpay trust badge */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  
                  <div>
                    <div className="font-semibold text-gray-900">Secure Payment via Razorpay</div>
                    <div className="text-sm text-gray-600">UPI, Cards, Net Banking, Wallets accepted</div>
                  </div>
                </div>
               
                <div className="flex items-center gap-6 mt-4">
  
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
   
            <img
            src={Razorpay}
            alt="Razorpay"
            className="h-5"/>
    
          </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <img
                    src={Paypal}
                    alt="PayPal"
                    className="h-5"
                  />  
                </label>

</div>
              </div>
            </div>
          </div>

          {/* ── Right: Summary + Pay button ── */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              {/* Profile */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {userdata?.avatar ? (
                    <img
                      src={userdata.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `${API_URL}/instagram/image?url=${encodeURIComponent(userdata.avatar)}`
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {userdata?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">@{userdata?.username || username}</div>
                  <div className="text-sm text-gray-600 capitalize">{platform}</div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Posts Selected:</span>
                   <span className="font-semibold">
                    {selectedPosts && selectedPosts.length > 0
                     ? selectedPosts.length
                       : orders.length}
                     </span>               
                      </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount:</span>
                    <span className="font-semibold">{(appliedCoupon.discount * 100).toFixed(0)}% OFF</span>
                  </div>
                )}

                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className={`font-bold text-2xl bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security note */}
              <div className="bg-green-50 rounded-xl p-3 mb-5">
                <div className="flex items-center gap-2 text-green-800 text-sm">
                  <span>🔒</span>
                  <span className="font-semibold">256-bit SSL Encrypted</span>
                </div>
                <p className="text-green-700 text-xs mt-1">
                  Your payment is 100% safe and secure
                </p>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePayment}
                disabled={paying || orders.length === 0}
                className={`w-full bg-gradient-to-r ${config.color} text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {paying ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Opening Razorpay...
                  </span>
                ) : (
                  `Pay $${total.toFixed(2)}`
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderPayment
