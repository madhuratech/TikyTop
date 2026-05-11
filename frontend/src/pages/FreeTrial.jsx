import { useNavigate } from 'react-router-dom'

const FreeTrialPage = () => {
  const navigate = useNavigate()

  const freeServices = [
    { id: 'likes', title: 'TikTok Likes Generator', description: 'A TikTok likes generator helps users boost engagement with zero hidden fees.', icon: '❤️', buttonText: 'Generate Likes', gradient: 'from-[#FF6B35] to-[#FFA500]', platform: 'tiktok' },
    { id: 'followers', title: 'TikTok Followers Generator', description: 'Start saving time and see how the followers generator works for you.', icon: '👥', buttonText: 'Generate Followers', gradient: 'from-[#FFA500] to-[#FFB3D9]', platform: 'tiktok' },
    { id: 'views', title: 'TikTok Views Generator', description: 'Higher views means higher popularity. Views improve your engagement rate.', icon: '👁️', buttonText: 'Generate Views', gradient: 'from-[#FFB3D9] to-[#FF6B9D]', platform: 'tiktok' }
  ]

  const handleGenerateClick = (service) => {
    navigate(`/${service.platform}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Test it Free. Pay Nothing</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Test our services before buying. Start your free trial today with zero hidden fees.
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white px-6 py-3 rounded-full font-semibold shadow-lg">
            <span className="text-xl">🎁</span>
            <span>Get 100 Free Coins to Try Any Service</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {freeServices.map((service, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                  <span className="text-3xl sm:text-4xl">{service.icon}</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">{service.title}</h3>
              <p className="text-gray-600 text-sm text-center mb-6">{service.description}</p>
              <button onClick={() => handleGenerateClick(service)}
                className={`w-full bg-gradient-to-r ${service.gradient} text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">How Free Trial Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: '1', title: 'Choose Service', desc: 'Select any free generator' },
              { step: '2', title: 'Enter Username', desc: 'Verify your account' },
              { step: '3', title: 'Use Free Coins', desc: 'Get 100 coins to try' },
              { step: '4', title: 'See Results', desc: 'Experience instant delivery' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3">{item.step}</div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreeTrialPage
