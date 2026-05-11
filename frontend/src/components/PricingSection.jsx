import instagramIcon from '../assets/icons/insta.png'
import youtubeIcon from '../assets/icons/yt.png'
import facebookIcon from '../assets/icons/fb.png'
import tiktokIcon from '../assets/icons/tiktok.png'

export default function PricingSection() {
  const pricingData = [
    { platform: 'TikTok Likes', price: '2.99', icon: tiktokIcon, color: 'from-black to-gray-800' },
    { platform: 'TikTok Followers', price: '4.99', icon: tiktokIcon, color: 'from-black to-gray-800' },
    { platform: 'Instagram Followers', price: '3.99', icon: instagramIcon, color: 'from-pink-500 to-rose-500' },
    { platform: 'Instagram Likes', price: '2.49', icon: instagramIcon, color: 'from-purple-500 to-pink-500' },
    { platform: 'YouTube Views', price: '5.99', icon: youtubeIcon, color: 'from-red-600 to-red-700' },
    { platform: 'YouTube Subscribers', price: '7.99', icon: youtubeIcon, color: 'from-red-500 to-red-800' },
    { platform: 'Facebook Page Likes', price: '3.49', icon: facebookIcon, color: 'from-blue-600 to-blue-700' },
    { platform: 'Facebook Video Views', price: '4.49', icon: facebookIcon, color: 'from-blue-500 to-indigo-700' },
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Pricing Plans
          </h2>
          <p className="text-lg text-gray-800 max-w-4xl mx-auto leading-relaxed">
            Explore some of our most popular social media growth services. Choose the platform you want to grow and discover packages designed to support different goals and budgets.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingData.map((item, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/70 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-[#FF6B35]/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={item.icon} alt={item.platform} className="w-8 h-8" />
                <h3 className="text-lg font-bold text-black">{item.platform}</h3>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-black">$</span>
                <span className="text-4xl font-bold text-black">{item.price}</span>
                <span className="text-gray-600 ml-1">/ package</span>
              </div>
              <button className={`w-full px-4 py-3 bg-gradient-to-r ${item.color} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-800 mb-6 text-lg">
            Explore detailed packages for each platform and choose the plan that fits your growth goals.
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[#FF6B35]/40 transition-all hover:scale-105">
            Explore Now
          </button>
        </div>

      </div>
    </div>
  );
}
