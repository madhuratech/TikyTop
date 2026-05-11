import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'
import { API_URL } from '../config'

const PostsSelection = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, selectedService } = location.state || {}
  const [selectedPosts, setSelectedPosts] = useState([])

  const userdata = location.state?.userdata

  if (!userdata) {
    navigate('/' + (platform || 'instagram'), { replace: true })
    return null
  }

  const getPostId = (post, index) =>
    post.id || post.videoId || post.pk || index

  // Pick the right posts/videos array based on platform
  const getPosts = () => {
    if (platform === 'youtube') return userdata.videos || userdata.posts || []
    if (platform === 'tiktok') return userdata.posts || userdata.videos || []
    // instagram / facebook
    return userdata.posts || []
  }

  const posts = getPosts()

  const platformConfig = {
    instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
    youtube: { color: 'from-red-500 to-red-600', name: 'YouTube', bgColor: 'bg-gradient-to-br from-red-50 to-orange-50' },
    facebook: { color: 'from-blue-600 to-blue-700', name: 'Facebook', bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
    tiktok: { color: 'from-black to-gray-800', name: 'TikTok', bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50' }
  }

  const config = platformConfig[platform] || platformConfig.instagram

  const handlePostToggle = (postId) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }


  const handleContinue = () => {
    if (selectedPosts.length === 0) {
      alert('Please select at least one post')
      return
    }

    const filteredPosts = posts.filter((post, index) => {
      const id = getPostId(post, index) // ✅ SAME ID LOGIC
      return selectedPosts.includes(id)
    })


    navigate('/quantity-pricing', {
      state: {
        username,
        platform,
        selectedService,
        userdata,
        selectedPosts: filteredPosts
      }
    })
  };
  // Image proxy helper for broken images
  const proxyUrl = (url) => {
    if (!url) return '';
    return `${API_URL}/instagram/image?url=${encodeURIComponent(url)}`;
  };

  return (
    <div className={`min-h-screen ${config.bgColor} py-8 px-4`}>
      <div className="max-w-6xl mx-auto">

        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
              {userdata?.avatar ? (
                <img
                  src={userdata.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (!e.target.src.includes('/image?url=')) {
                      e.target.src = proxyUrl(userdata.avatar);
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  {userdata?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">@{userdata?.username}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Service: <span className="font-semibold">{selectedService?.name}</span></span>
                <span>•</span>
                <span>Platform: <span className="font-semibold capitalize">{platform}</span></span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Selected Posts</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {selectedPosts.length}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Selection */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Select Posts for{' '}
              <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {selectedService?.name}
              </span>
            </h2>
            <p className="text-gray-600">
              Choose which posts you want to boost with {selectedService?.name?.toLowerCase()}
            </p>
          </div>

          {/* No posts fallback */}
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No posts found</h3>
              <p className="text-gray-500 mb-6">
                We couldn't load any posts for <span className="font-semibold">@{userdata?.username}</span>.
                The account may be private or have no posts.
              </p>
              <button
                onClick={() => navigate(-1)}
                className={`bg-gradient-to-r ${config.color} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all`}
              >
                ← Go Back
              </button>
            </div>
          ) : (
            <>
              {/* Select All / Deselect All */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedPosts(posts.map((p, i) => getPostId(p, i)))}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setSelectedPosts([])}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Deselect All
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedPosts.length} of {posts.length} posts selected
                </div>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                {posts.map((post, index) => {
                  const postId = getPostId(post, index);
                  const postDisplayImg = post.image || post.thumbnail || post.cover || post.display_url;

                  return (
                    <div
                      key={postId}
                      onClick={() => handlePostToggle(postId)}
                      className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${selectedPosts.includes(postId)
                        ? 'ring-4 ring-blue-500 shadow-2xl scale-105'
                        : 'hover:shadow-xl'
                        }`}
                    >
                      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                        {postDisplayImg ? (
                          <img
                            src={postDisplayImg}
                            alt="Post"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              if (!e.target.src.includes('/image?url=')) {
                                e.target.src = proxyUrl(postDisplayImg);
                              }
                            }}
                          />
                        ) : (
                          <div className="text-gray-400">🖼️</div>
                        )}
                      </div>

                      {/* ✅ Selection Indicator */}
                      {selectedPosts.includes(postId) && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg z-10">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
                        <div className="flex justify-between text-xs">
                          <span>❤️ {post.likes ?? ''}</span>
                          <span>💬 {post.comments ?? ''}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Continue Button */}
              <div className="text-center">
                <button
                  onClick={handleContinue}
                  disabled={selectedPosts.length === 0}
                  className={`bg-gradient-to-r ${config.color} text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  Continue with {selectedPosts.length} Post{selectedPosts.length !== 1 ? 's' : ''}
                </button>
                {selectedPosts.length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">Select at least one post to continue</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsSelection;
