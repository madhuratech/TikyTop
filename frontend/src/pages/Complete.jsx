import { useLocation, useNavigate } from 'react-router-dom'

const OrderComplete = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderId, username, platform, service, quantity, price } = location.state || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Order Successful!</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8">
            Your {service} are being delivered to <span className="font-semibold text-[#FF6B35]">@{username}</span>
          </p>
          <div className="bg-[#FFF5E6] rounded-2xl p-4 sm:p-6 mb-8 text-left">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#FFE5D9]">
              <span className="text-sm text-gray-600">Order ID</span>
              <span className="font-mono font-semibold text-gray-900 text-sm">{orderId}</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-600">Platform:</span><span className="font-semibold capitalize">{platform}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-600">Service:</span><span className="font-semibold capitalize">{service}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-600">Quantity:</span><span className="font-semibold">{quantity?.toLocaleString()}</span></div>
              {price && <div className="flex justify-between pt-3 border-t border-[#FFE5D9]"><span className="font-bold text-gray-900">Total Paid:</span><span className="font-bold text-xl text-[#FF6B35]">${price?.toFixed?.(2) || price}</span></div>}
            </div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-xl">🚀</span>
              <div className="text-left">
                <h3 className="font-semibold text-blue-900 mb-1">Delivery in Progress</h3>
                <p className="text-sm text-blue-800">Your order will be delivered within 5-30 minutes.</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <button onClick={() => navigate('/')} className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02]">Place Another Order</button>
            <button onClick={() => navigate('/track', { state: { orderId, username, platform, service, quantity } })} className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">Track Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderComplete
