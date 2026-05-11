import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/Button'

const Account = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform } = location.state || {}

  useEffect(() => {
    if (!username || !platform) { navigate('/'); return }
  }, [username, platform, navigate])

  const getPlatformIcon = () => {
    const icons = { instagram: '📷', tiktok: '🎵', youtube: '▶️', facebook: '👥' }
    return icons[platform] || '📱'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] py-8 sm:py-12 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="text-5xl sm:text-6xl mb-4">{getPlatformIcon()}</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Account Verified</h1>
            <p className="text-gray-600">@{username} on {platform}</p>
          </div>
          <div className="flex justify-center">
            <Button onClick={() => navigate('/profile-overview', { state: { username, platform } })} size="lg">
              Continue to Service Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
