import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Button from './Button';
import { getFromStorage, removeFromStorage } from '../utils';

import TikyTop from "../assets/logos/TikyTop.png"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = getFromStorage('user');
    setUser(loggedInUser);
  }, [location]);

  const handleLogout = () => {
    removeFromStorage('token');
    removeFromStorage('user');
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  const platforms = [
    {
      name: 'TikTok',
      // path: '/tiktok',
      services: [
        { name: 'TikTok Views', service: 'views' },
        { name: 'TikTok Followers', service: 'followers' },
        { name: 'TikTok Likes', service: 'likes' },
        { name: 'TikTok Comments', service: 'comments' }
      ]
    },
    {
      name: 'Instagram',
      // path: '/instagram',
      services: [
        { name: 'Instagram Followers', service: 'followers' },
        { name: 'Instagram Likes', service: 'likes' },
        { name: 'Instagram Views', service: 'views' },
        { name: 'Instagram Comments', service: 'comments' }
      ]
    },
    {
      name: 'Facebook',
      // path: '/facebook',
      services: [
        { name: 'Facebook Likes', service: 'likes' },
        { name: 'Facebook Followers', service: 'followers' },
        { name: 'Facebook Views', service: 'views' },
        { name: 'Facebook Comments', service: 'comments' }
      ]
    },
    {
      name: 'YouTube',
      // path: '/youtube',
      services: [
        { name: 'YouTube Views', service: 'views' },
        { name: 'YouTube Subscribers', service: 'subscribers' },
        { name: 'YouTube Likes', service: 'likes' },
        { name: 'YouTube Comments', service: 'comments' }
      ]
    }
  ]

  const isActive = (path) => location.pathname === path

  const handleServiceClick = (platformPath) => {
    navigate(platformPath)
    setActiveDropdown(null)
  }

  const handleMouseEnter = (dropdown) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 300)
    setCloseTimeout(timeout)
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-white/40 shadow-lg ">
      <style>{`
        .glass-button {
          background: linear-gradient(135deg, #FF6B35, #FFA500);
          transition: all 0.3s ease;
        }
        .glass-button:hover {
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.35);
          transform: translateY(-2px);
        }
        .outline-button {
          border: 1.5px solid rgba(255, 165, 0, 0.5);
          background: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }
        .outline-button:hover {
          border-color: rgba(255, 165, 0, 0.8);
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }
      `}</style>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={TikyTop} 
              alt="Tikytop"
              className="h-20 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('all-services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="font-medium transition-colors flex items-center space-x-1 text-gray-700 hover:text-[#bb0ea1]"
              >
                <span>All Services</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {activeDropdown === 'all-services' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-[800px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl py-6 border border-white/50 max-h-96 overflow-y-auto"
                    onMouseEnter={() => handleMouseEnter('all-services')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-4 gap-6 px-6">
                      {platforms.map((platform, platformIndex) => (
                        <motion.div
                          key={platform.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: platformIndex * 0.05, duration: 0.3 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#FFE5D9] to-[#FFF0E6] rounded-lg">
                            <div className="text-lg">
                              {platform.name === 'TikTok' && '🎵'}
                              {platform.name === 'Instagram' && '📸'}
                              {platform.name === 'Facebook' && '👥'}
                              {platform.name === 'YouTube' && '▶️'}
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                              {platform.name}
                            </div>
                          </div>
                          <div className="space-y-1">
                            {platform.services.map((service, serviceIndex) => (
                              <motion.button
                                key={service.service}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (platformIndex * 0.05) + (serviceIndex * 0.03), duration: 0.2 }}
                                onClick={() => handleServiceClick(platform.path)}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-[#FFE5D9] hover:text-[#bb0ea1] transition-all rounded-lg group"
                                whileHover={{ x: 4 }}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full bg-[#FFA500]  transition-opacity"></span>
                                  {service.name}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(platform.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={platform.path}
                  className={`font-medium transition-colors flex items-center space-x-1 ${isActive(platform.path)
                      ? 'text-[#FF6B35]'
                      : 'text-gray-700 hover:text-[#bb0ea1]'
                    }`}
                >
                  <span>{platform.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                <AnimatePresence>
                  {activeDropdown === platform.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl py-3 border border-white/50"
                      onMouseEnter={() => handleMouseEnter(platform.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {platform.services.map((service, index) => (
                        <motion.button
                          key={service.service}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                          onClick={() => handleServiceClick(platform.path)}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FFE5D9] hover:text-[#bb0ea1] transition-all group flex items-center gap-2"
                          whileHover={{ x: 4 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFA500]   transition-opacity"></span>
                          {service.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              to="/free-trial"
              className="font-medium transition-colors text-gray-700 hover:text-[#bb0ea1]"
            >
              Free Trial
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#b24eac] rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>  
                  <span className="font-medium text-gray-700">{user.name}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 z-50"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE5D9] hover:text-[#bb0ea1] transition-colors"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/my-orders"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE5D9] hover:text-[#bb0ea1] transition-colors"
                        >
                          My Orders
                        </Link>
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden pb-4 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain"
            >
              <div className="space-y-3 pt-4 ">
                <div className="space-y-2">
                  <div className="py-2 font-medium text-gray-900">All Services</div>
                  {platforms.map((platform) => (
                    <div key={`mobile-${platform.name}`} className="pl-4 space-y-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {platform.name}
                      </div>
                      <div className="pl-2 space-y-1">
                        {platform.services.map((service) => (
                          <button
                            key={service.service}
                            onClick={() => {
                              handleServiceClick(platform.path)
                              setIsOpen(false)
                            }}
                            className="block w-full text-left py-1 text-sm text-gray-600 hover:text-primary-600"
                          >
                            {service.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {platforms.map((platform) => (
                  <div key={platform.name} className="space-y-2">
                    <Link
                      to={platform.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 font-medium ${isActive(platform.path) ? 'text-primary-600' : 'text-gray-700'
                        }`}
                    >
                      {platform.name}
                    </Link>
                    <div className="pl-4 space-y-1">
                      {platform.services.map((service) => (
                        <button
                          key={service.service}
                          onClick={() => {
                            handleServiceClick(platform.path)
                            setIsOpen(false)
                          }}
                          className="block w-full text-left py-1 text-sm text-gray-600 hover:text-primary-600"
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <Link
                  to="/free-trial"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 font-medium text-gray-700 text-center"
                >
                  Free Trial
                </Link>

                <div className="space-y-2 pt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button fullWidth variant="secondary" size="sm" className='mb-2'>Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button fullWidth size="sm">Register</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
