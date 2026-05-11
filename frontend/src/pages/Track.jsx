import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TrackOrder = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderId: initialOrderId, username, platform, service, quantity } = location.state || {}
  
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const orderId = initialOrderId

  const steps = [
    { id: 1, title: 'Order Confirmed', description: 'Your order has been received', time: 'Just now' },
    { id: 2, title: 'Processing', description: 'Preparing your order for delivery', time: currentStep >= 2 ? 'In progress' : 'Pending' },
    { id: 3, title: 'Delivering', description: `Sending ${service || 'service'} to @${username || 'user'}`, time: currentStep >= 3 ? 'In progress' : 'Pending' },
    { id: 4, title: 'Completed', description: 'Order successfully delivered', time: currentStep >= 4 ? 'Completed' : 'Pending' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => { if (prev >= 4) { clearInterval(interval); return 4 }; return prev + 1 })
      setProgress((prev) => prev >= 100 ? 100 : prev + 25)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">No Order Found</h1>
          <p className="text-gray-600 mb-6">Please place an order first</p>
          <button onClick={() => navigate('/')} className="bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">Go to Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-base sm:text-lg text-gray-600">Order ID: <span className="font-mono font-semibold text-[#FF6B35]">{orderId}</span></p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Order Details</h2>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${currentStep === 4 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              {currentStep === 4 ? 'Completed' : 'In Progress'}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><div className="text-sm text-gray-600 mb-1">Platform</div><div className="font-semibold capitalize">{platform}</div></div>
            <div><div className="text-sm text-gray-600 mb-1">Username</div><div className="font-semibold">@{username}</div></div>
            <div><div className="text-sm text-gray-600 mb-1">Service</div><div className="font-semibold capitalize">{service}</div></div>
            <div><div className="text-sm text-gray-600 mb-1">Quantity</div><div className="font-semibold">{quantity?.toLocaleString()}</div></div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-bold text-[#FF6B35]">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFA500] transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-8">Order Timeline</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-[#FF6B35] to-[#FFA500] transition-all duration-1000" style={{ height: `${(currentStep - 1) * 33.33}%` }}></div>
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.id} className="relative flex items-start gap-4 sm:gap-6">
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-500 flex-shrink-0 ${step.id <= currentStep ? 'bg-gradient-to-br from-[#FF6B35] to-[#FFA500] text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}>
                    {step.id <= currentStep ? '✓' : step.id}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                      <h3 className={`text-base sm:text-lg font-bold ${step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</h3>
                      <span className={`text-sm font-medium ${step.id <= currentStep ? 'text-[#FF6B35]' : 'text-gray-400'}`}>{step.time}</span>
                    </div>
                    <p className={`text-sm ${step.id <= currentStep ? 'text-gray-600' : 'text-gray-400'}`}>{step.description}</p>
                    {step.id === currentStep && currentStep < 4 && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-[#FF6B35]">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse"></span>
                          <span className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                          <span className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                        <span className="font-medium">Processing...</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button onClick={() => navigate('/')} className="flex-1 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all">Place Another Order</button>
          <button onClick={() => navigate(-1)} className="flex-1 bg-white/80 text-gray-700 py-4 rounded-xl font-semibold hover:bg-white transition-colors">Back</button>
        </div>
      </div>
    </div>
  )
}

export default TrackOrder
