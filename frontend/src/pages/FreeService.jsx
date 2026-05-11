import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/Button'

const FreeTrialService = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, service: initialService } = location.state || {}
  
  const [selectedService, setSelectedService] = useState(initialService || 'likes')
  const [freeCoins] = useState(100)
  const [usedCoins, setUsedCoins] = useState(0)

  const services = [
    { id: 'views', name: 'Views', icon: '👁️', description: 'Boost video visibility', coinCost: 10 },
    { id: 'followers', name: 'Followers', icon: '👥', description: 'Grow your audience', coinCost: 20 },
    { id: 'likes', name: 'Likes', icon: '❤️', description: 'Increase engagement', coinCost: 5 },
    { id: 'comments', name: 'Comments', icon: '💬', description: 'Add social proof', coinCost: 15 }
  ]

  const selectedServiceData = services.find(s => s.id === selectedService)
  const remainingCoins = freeCoins - usedCoins
  const canAfford = remainingCoins >= (selectedServiceData?.coinCost || 0)

  const handleUseFreeService = () => {
    if (!canAfford) {
      alert('Not enough coins! Upgrade to paid service.')
      navigate(`/${platform}`)
      return
    }
    setUsedCoins(usedCoins + selectedServiceData.coinCost)
    alert(`Success! Used ${selectedServiceData.coinCost} coins for ${selectedServiceData.name}. Remaining: ${remainingCoins - selectedServiceData.coinCost}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg mb-4">
            <span className="text-2xl sm:text-3xl">🪙</span>
            <div className="text-left">
              <div className="text-xs sm:text-sm font-medium opacity-90">Free Trial Coins</div>
              <div className="text-xl sm:text-2xl font-bold">{remainingCoins} / {freeCoins}</div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Try {platform?.charAt(0).toUpperCase() + platform?.slice(1)} Services Free
          </h1>
          <p className="text-base sm:text-lg text-gray-600">Account: <span className="font-semibold text-[#FF6B35]">@{username}</span></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Select Free Service</h2>
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} onClick={() => setSelectedService(service.id)}
                    className={`cursor-pointer transition-all duration-200 ${selectedService === service.id ? 'ring-2 ring-[#FF6B35]' : ''}`}>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="text-2xl sm:text-3xl">{service.icon}</div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base">{service.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#FFF5E6] text-[#FF6B35] px-3 sm:px-4 py-2 rounded-full font-semibold text-sm">
                        <span>🪙</span><span>{service.coinCost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg sticky top-20">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Platform:</span><span className="font-semibold capitalize">{platform}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Service:</span><span className="font-semibold">{selectedServiceData?.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Cost:</span><span className="font-semibold text-[#FF6B35]">🪙 {selectedServiceData?.coinCost}</span></div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Remaining:</span>
                  <span className="font-bold text-lg text-[#FF6B35]">🪙 {canAfford ? remainingCoins - selectedServiceData.coinCost : remainingCoins}</span>
                </div>
              </div>
              <Button fullWidth size="lg" onClick={handleUseFreeService} disabled={!canAfford} className="mb-3">
                {canAfford ? 'Use Free Service' : 'Not Enough Coins'}
              </Button>
              <button onClick={() => navigate(`/${platform}`)} className="w-full bg-gradient-to-r from-[#FFA500] to-[#FFB3D9] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                Upgrade to Paid Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreeTrialService
