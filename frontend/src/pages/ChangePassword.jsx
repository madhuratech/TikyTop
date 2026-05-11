import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const ChangePassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) { setError('New passwords do not match'); return }
    if (formData.newPassword.length < 6) { setError('New password must be at least 6 characters long'); return }
    if (formData.currentPassword === formData.newPassword) { setError('New password must be different from current password'); return }

    setIsLoading(true)
    setError('')
    setTimeout(() => {
      setSuccess('Password changed successfully!')
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setIsLoading(false)
      setTimeout(() => navigate('/profile'), 2000)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <button onClick={() => navigate('/profile')} className="flex items-center text-gray-600 hover:text-[#FF6B35] mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Profile
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Change Password</h1>
          <p className="text-gray-600">Update your account password</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-sm text-red-600">{error}</p></div>}
          {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"><p className="text-sm text-green-600">{success}</p></div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
                  {field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
                </label>
                <input type="password" id={field} name={field} value={formData[field]} onChange={handleChange} required minLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors bg-white"
                  placeholder={field === 'currentPassword' ? 'Enter current password' : field === 'newPassword' ? 'Enter new password' : 'Confirm new password'} />
              </div>
            ))}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>{isLoading ? 'Changing...' : 'Change Password'}</Button>
              <Button type="button" onClick={() => navigate('/profile')} variant="outline" disabled={isLoading}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
