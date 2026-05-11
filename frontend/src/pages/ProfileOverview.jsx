import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'
import { API_URL } from '../config'

const ProfileOverview = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform } = location.state || {}
  
  const [selectedService, setSelectedService] = useState(null)
  const userdata = location.state?.userdata;

  // Mock profile data

   useEffect(() =>{
     if(!userdata){
      navigate("/instagram",{replace: true});
     }
   },[userdata, navigate]);

  if (!userdata) return null;


  // Platform-specific services
  const platformServices = {
    instagram: [
      { id: 2361, name: 'Followers', icon: '👥', description: 'Get real Instagram followers', price: 'From $2.70', popular: true },
      { id: 2448, name: 'Likes', icon: '❤️', description: 'Boost your post likes', price: 'From $5.00', popular: false },
      { id: 2460, name: 'Comments', icon: '💬', description: 'Get authentic comments', price: 'From $4.00', popular: false },
      { id: 1625, name: 'Views', icon: '👁️', description: 'Increase story/reel views', price: 'From $2.80', popular: false },
      { id: 576, name: 'Shares', icon: '📤', description: 'Increase post shares', price: 'From $2.50', popular: false }
    ],
    youtube: [
      { id: 2411, name: 'Subscribers', icon: '👥', description: 'Gain real subscribers', price: 'From $5.70', popular: true },
      { id: 2457, name: 'Views', icon: '👁️', description: 'Boost video views', price: 'From $4.50', popular: false },
      { id: 2456, name: 'Likes', icon: '👍', description: 'Get video likes', price: 'From $4.00', popular: false },
      { id: 242, name: 'Comments', icon: '💬', description: 'Authentic comments', price: 'From $3.50', popular: false },
      { id: 7001, name: 'Shares', icon: '📤', description: 'Increase video shares', price: 'From $4.50', popular: false },
      { id: 7002, name: 'Watch Time', icon: '⏱️', description: 'Boost watch hours', price: 'From $7.99', popular: false }
    ],
    facebook: [
      { id: 1023  , name: 'Post Likes', icon: '❤️', description: 'Boost post engagement', price: 'From $1.50', popular: false },
      { id: 2045, name: 'Followers', icon: '👥', description: 'Personal profile followers', price: 'From $2.50', popular: false },
      { id: 3099, name: 'Video Views', icon: '📹', description: 'Boost video views', price: 'From $1.49', popular: false },
      { id: 'comments', name: 'Comments', icon: '💬', description: 'Get post comments', price: 'From $4.99', popular: false },
      { id: 'shares', name: 'Shares', icon: '📤', description: 'Increase post shares', price: 'From $1.20', popular: false },
    ],
    tiktok: [
      { id: 2384, name: 'Followers', icon: '👥', description: 'Get TikTok followers', price: 'From $3.50', popular: true },
      { id: 1617, name: 'Likes', icon: '❤️', description: 'Boost video likes', price: 'From $1.50', popular: false },
      { id: 310, name: 'Views', icon: '👁️', description: 'Increase video views', price: 'From $0.80', popular: false },
      { id: 2461, name: 'Comments', icon: '💬', description: 'Get video comments', price: 'From $4.99', popular: false },
      { id: 703, name: 'Shares', icon: '📤', description: 'Boost video shares', price: 'From $1.20', popular: false },
      { id: 'favorites', name: 'Favorites', icon: '⭐', description: 'Get video favorites', price: 'From $3.49', popular: false }
    ]
  }

  const services = platformServices[platform] || platformServices.instagram

  const platformConfig = {
    instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
    youtube: { color: 'from-red-500 to-red-600', name: 'YouTube', bgColor: 'bg-gradient-to-br from-red-50 to-orange-50' },
    facebook: { color: 'from-blue-600 to-blue-700', name: 'Facebook', bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
    tiktok: { color: 'from-black to-gray-800', name: 'TikTok', bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50' }
  }

  const config = platformConfig[platform] || platformConfig.instagram

  const handleServiceSelect = (service) => {
    setSelectedService(service.id)
    navigate('/posts-selection', {
      state: {
        username,
        platform,
        selectedService: service,
        userdata: userdata
      }
    })
  }

// Formatnumber;
 const formatnumber = (num) => {
    if(num === undefined || num === null) return "0";
    if(num > 1000000) return (num / 1000000).toFixed(1) + 'M';
    if(num > 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className={`min-h-screen ${config.bgColor} py-8 px-4`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {userdata?.avatar ? (
                  <img 
                    src={userdata.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =`${API_URL}/instagram/image?url=${encodeURIComponent(userdata?.avatar)}`

                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                    {userdata?.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              {userdata?.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 w-7 h-7 rounded-full border-4 border-white flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-2">
                 <h1 className="text-3xl font-bold text-gray-900">@{userdata?.username?.startsWith('@') ? userdata.username.slice(1) : userdata?.username}</h1>
                 {userdata?.verified && <span className="text-blue-500">✔</span>}
                 {userdata?.isPrivate && (
                   <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">Private</span>
                 )}
               </div>
               
               {userdata?.url && (
                 <a 
                   href={userdata.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-blue-600 text-sm hover:underline block mb-3"
                 >
                   {userdata.url}
                 </a>
               )}

               <p className="text-gray-600 mb-4">{userdata?.bio || userdata?.description}</p>
              
              <div className="flex gap-8">
               {(platform === "instagram" || platform === "facebook" || platform === "tiktok") &&  (
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatnumber(userdata?.postsCount || userdata?.posts_count)}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                )}
                 {platform === "youtube" && (
                  <div className="text-center">
      <           div className="text-xl font-bold text-gray-900">
                   {formatnumber(userdata?.videosCount)}
                  </div>
                 <div className="text-sm text-gray-600">Videos</div>
                </div>
                 )}

                 {/* instagram followers */}

                {(platform === "facebook" || platform === "instagram" || platform === "tiktok") && (
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatnumber(userdata?.followers)}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                )}

                
                {platform === "youtube" && (
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatnumber
                    (userdata?.subscribers)}</div>
                  <div className="text-sm text-gray-600">Subscribers</div>
                </div>
                )}


                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatnumber(userdata?.following)}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Services Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Choose Your <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{config.name}</span> Service
            </h2>
            <p className="text-gray-600">Select the service you want to boost for this profile</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="relative cursor-pointer group transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                {service.popular && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    POPULAR
                  </div>
                )}
                
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-gray-200 transition-all group-hover:shadow-lg">
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${config.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg`}>
                      {service.id === 2361 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                      )}
                      {service.id === 2448 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {service.id === 2460 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {service.id === 1625 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {service.id === 576 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                        </svg>
                      )}
                      {service.id === 'saves' && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                        </svg>
                      )}
  
  {/* Youtube */}

                      {service.id === 2411 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                      )}
                      {service.id === 2457  && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {service.id === 2456 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                        </svg>
                      )}

                       {service.id === 242 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                        </svg>
                      )}



{/* tiktoks */}
                      {service.id === 1617 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {service.id === 2384 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                        </svg>
                      )}
                      {service.id === 'favorites' && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      )}

{/*Facebook  */}
                         {service.id === 1023 &&(
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                        </svg>
                         )}
                         {service.id === 2045 &&(
                           <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                         )}
                          {service.id === 3099 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                      )}

                         

                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <div className={`text-lg font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                      {service.price}
                    </div>
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r ${config.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200`}>
                    Select {service.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileOverview
