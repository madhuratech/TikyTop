import { useState } from 'react'
import PlatformIcon from './PlatformIcon'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const PlatformHero = ({ platform = "instagram" }) => {
  const [username, setUsername] = useState('')
  const [activeTab, setActiveTab] = useState('channel')
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();


  const PLATFORM_API_URLS = {
    instagram: `${API_URL}/instagram/user/`,
    youtube: `${API_URL}/youtube/search/`,
    facebook: `${API_URL}/facebook/user/all/`,
    tiktok: `${API_URL}/tiktok/user/`,
  };

  const Getuser = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("please enter username");
      return;
    }

    const API_URL = PLATFORM_API_URLS[platform] || PLATFORM_API_URLS.instagram;

    try {
      setIsSearching(true);
      const response = await fetch(`${API_URL}${username}`);
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : null;

      if (!result) {
        throw new Error(`Expected JSON from ${response.url}, but received ${contentType || "unknown content type"}`);
      }

      if (!response.ok) {
        throw new Error(result.message || "User not found");
      }

      navigate("/profile-overview", {
        state: {
          userdata: result,
          platform: platform,
          username: username,
        },
      });

    } catch (error) {
      console.error("Error fetching user data:", error);
      alert(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const platformConfig = {
    instagram: {
      title: 'Grow Your Instagram Following',
      subtitle: 'Get real Instagram followers, likes, views, and comments to grow your profile organically.',
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-pink-200 via-purple-50 to-purple-200',
      buttonColor: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
      placeholder: 'Enter Instagram username',
      services: [
        { icon: '👥', name: 'Followers', desc: 'Gain real followers' },
        { icon: '❤️', name: 'Likes', desc: 'Boost post likes' },
        { icon: '👁️', name: 'Views', desc: 'Increase reach' },
        { icon: '💬', name: 'Comments', desc: 'Get more comments' }
      ],
      features: [
        { icon: '✓', text: 'Real Followers' },
        { icon: '⚡', text: 'Instant Start' },
        { icon: '🛡️', text: 'Safe & Secure' },
        { icon: '🕐', text: '24/7 Support' }
      ]
    },
    youtube: {
      title: 'Boost Your YouTube Presence',
      subtitle: 'Grow your YouTube channel with real subscribers, views, likes, and comments from genuine users.',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-gradient-to-br from-red-200 via-orange-50 to-orange-200',
      buttonColor: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      placeholder: 'Enter YouTube channel name or @username',
      tabs: true,
      services: [
        { icon: '👁️', name: 'Views', desc: 'Increase video views' },
        { icon: '👥', name: 'Subscribers', desc: 'Gain real subscribers' },
        { icon: '❤️', name: 'Likes', desc: 'Boost video likes' },
        { icon: '💬', name: 'Comments', desc: 'Get more comments' }
      ],
      features: [
        { icon: '🔒', text: 'Secure Service' },
        { icon: '⚡', text: 'Instant Delivery' },
        { icon: '🕐', text: '24/7 Support' },
        { icon: '💰', text: 'Best Prices' }
      ]
    },
    facebook: {
      title: 'Grow Your Facebook Page',
      subtitle: 'Get real Facebook page likes, followers, and engagement to grow your business or brand.',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-200 via-blue-50 to-indigo-200',
      buttonColor: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      placeholder: 'Enter Facebook page name or username',
      services: [
        { icon: '👍', name: 'Page Likes', desc: 'Get more page likes' },
        { icon: '👥', name: 'Followers', desc: 'Gain followers' },
        { icon: '❤️', name: 'Post Likes', desc: 'Boost engagement' },
        { icon: '📢', name: 'Reach', desc: 'Increase visibility' }
      ],
      features: [
        { icon: '✓', text: 'Real Page Likes' },
        { icon: '⚡', text: 'Instant Start' },
        { icon: '💰', text: 'Best Prices' },
        { icon: '🕐', text: '24/7 Support' }
      ]
    },
    tiktok: {
      title: 'Grow Your TikTok Account',
      subtitle: 'Get real TikTok followers, likes, views, and comments to boost your profile organically.',
      color: 'from-black to-gray-800',
      bgColor: 'bg-gradient-to-br from-gray-300 via-gray-50 to-slate-200',
      buttonColor: 'bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black',
      placeholder: 'Enter TikTok username',
      services: [
        { icon: '👁️', name: 'Views', desc: 'Boost video views' },
        { icon: '👥', name: 'Followers', desc: 'Gain followers' },
        { icon: '❤️', name: 'Likes', desc: 'Increase likes' },
        { icon: '💬', name: 'Comments', desc: 'Get comments' }
      ],
      features: [
        { icon: '✓', text: 'Real Followers' },
        { icon: '⚡', text: 'Instant Start' },
        { icon: '🛡️', text: 'Safe & Secure' },
        { icon: '🕐', text: '24/7 Support' }
      ]
    }
  }

  const config = platformConfig[platform]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Custom Background Text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="text-center transform -rotate-12">
          <div className="text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black text-gray-400/30 leading-none select-none tracking-wider">
            GROWTH
          </div>
          <div className="text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black text-gray-400/30 leading-none select-none tracking-wider -mt-4 md:-mt-8">
            FUNNEL
          </div>
        </div>
      </div>

      {/* Gradient overlay for text readability */}
      <div className={`absolute inset-0 z-[1] ${config.bgColor} opacity-70`} />

      {/* Content */}
      <div className="relative z-10 min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          {/* Platform Icon & Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className={`bg-gradient-to-br ${config.color} p-3 rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300`}>
                <PlatformIcon platform={platform} size="md" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {config.title.split(' ').map((word, idx) => {
                const isHighlight = word === 'Instagram' || word === 'YouTube' || word === 'Facebook' || word === 'TikTok'
                return (
                  <span key={idx}>
                    {isHighlight ? (
                      <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                    {idx < config.title.split(' ').length - 1 ? ' ' : ''}
                  </span>
                )
              })}
            </h1>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              {config.subtitle}
            </p>
          </div>

          {/* Search Form */}
          <div className="mb-8">
            <form onSubmit={Getuser}>
              {config.tabs && (
                <div className="flex gap-2 mb-3 justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('channel')}
                    className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${activeTab === 'channel'
                        ? `bg-gradient-to-r ${config.color} text-white`
                        : 'bg-white text-gray-700 border border-gray-200'
                      }`}
                  >
                    Channel
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('video')}
                    className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${activeTab === 'video'
                        ? `bg-gradient-to-r ${config.color} text-white`
                        : 'bg-white text-gray-700 border border-gray-200'
                      }`}
                  >
                    Video URL
                  </button>
                </div>
              )}

              <div className="flex items-center bg-white rounded-xl shadow-2xl hover:shadow-3xl overflow-hidden border border-gray-200 focus-within:border-gray-400 focus-within:shadow-3xl transition-all duration-300">
                <div className="pl-5 pr-2 flex items-center text-gray-400 text-lg font-semibold">
                  {platform === 'instagram' && <span>@</span>}
                  {platform === 'youtube' && <span>📺</span>}
                  {platform === 'facebook' && <span>f</span>}
                  {platform === 'tiktok' && <span>@</span>}
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={config.placeholder}
                  className="flex-1 py-3 px-3 text-base text-gray-700 focus:outline-none placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className={`${config.buttonColor} text-white px-6 py-3 font-semibold transition-all disabled:opacity-50 flex items-center gap-2 text-sm`}
                >
                  <span>{isSearching ? '⏳' : '🔍'}</span>
                  <span>{isSearching ? 'Searching...' : 'SEARCH'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Stats Section */}
          <div className="mt-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-2xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>50K+</div>
                <div className="text-xs text-gray-600 mt-1 font-medium">Active Users</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>4.9★</div>
                <div className="text-xs text-gray-600 mt-1 font-medium">Rated</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>24/7</div>
                <div className="text-xs text-gray-600 mt-1 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlatformHero
