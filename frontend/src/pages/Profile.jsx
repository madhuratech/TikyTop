import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getFromStorage } from '../utils';

const Profile = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [userData, setUserData] = useState({ name: '', email: '' })
  const [formData, setFormData] = useState({ name: '', email: '' })

  useEffect(() => {
    const user = getFromStorage('user')
    if (!user) {
      navigate('/login')
      return
    }
    setUserData({ name: user.name || 'User', email: user.email || '' })
    setFormData({ name: user.name || 'User', email: user.email || '' })
  }, [navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setUserData(formData)
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
      setIsLoading(false)
    }, 500)
  }

  const handleCancel = () => {
    setFormData({ name: userData.name, email: userData.email })
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 pb-8 border-b border-gray-200 gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFA500] flex items-center justify-center text-white text-2xl sm:text-3xl font-bold flex-shrink-0">
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} required
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors ${isEditing ? 'border-gray-300 focus:border-[#FF6B35] focus:outline-none bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} required
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors ${isEditing ? 'border-gray-300 focus:border-[#FF6B35] focus:outline-none bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`} />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {!isEditing ? (
                  <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <>
                    <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</Button>
                    <Button type="button" onClick={handleCancel} variant="outline" disabled={isLoading}>Cancel</Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={() => navigate('/my-orders')} className="w-full text-left px-4 py-3 bg-[#FFF5E6] hover:bg-[#FFE5D9] rounded-lg transition-colors">
                <span className="text-[#FF6B35] font-medium">📦 View My Orders</span>
              </button>
              <button onClick={() => navigate('/password')} className="w-full text-left px-4 py-3 bg-[#FFE5F0] hover:bg-[#FFD9E8] rounded-lg transition-colors">
                <span className="text-[#FF6B35] font-medium">🔒 Change Password</span>
              </button>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
