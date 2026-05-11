import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentProcessing = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { orderId, username, platform, selectedService, quantity, totalPrice } = location.state || {}
  
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('processing')

  useEffect(() => {
    if (!orderId) { navigate('/'); return }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setStatus('complete')
          setTimeout(() => {
            navigate('/complete', { state: { orderId, username, platform, service: selectedService?.name, quantity, price: totalPrice } })
          }, 1500)
          return 100
        }
        return newProgress
      })
    }, 300)

    return () => clearInterval(interval)
  }, [orderId, navigate, username, platform, selectedService, quantity, totalPrice])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl max-w-md w-full text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-[#FF6B35] rounded-full border-t-transparent animate-spin" style={{ animationDuration: '1s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#FF6B35]">{progress}%</span>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {status === 'processing' ? 'Almost done' : 'Payment Complete!'}
        </h2>
        <p className="text-gray-600 mb-6">
          {status === 'processing' ? 'Hold on, processing your order...' : 'Your order has been confirmed'}
        </p>
        <div className="bg-[#FFF5E6] rounded-xl p-4 mb-4">
          <div className="text-sm text-gray-600 mb-1">Processing order for</div>
          <div className="font-bold text-gray-900">@{username}</div>
          <div className="text-sm text-gray-600 capitalize">{quantity?.toLocaleString()} {selectedService?.name}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFA500] transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-4">Please do not close this window</p>
      </div>
    </div>
  )
}

export default PaymentProcessing
