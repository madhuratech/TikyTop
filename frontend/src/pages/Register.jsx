import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { API_URL } from '../config';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmpassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          confirmpassword: formData.confirmpassword
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and redirect to dashboard
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join SocialBoost and start growing today</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-sm text-red-600">{error}</p></div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input type="text" id="name" name="fullname" value={formData.fullname} onChange={handleChange} required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors bg-white" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors bg-white" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors bg-white" placeholder="••••••••" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} required minLength={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors bg-white" placeholder="••••••••" />
            </div>
            <Button type="submit" fullWidth size="lg" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#FF6B35] hover:text-[#F05A24] font-semibold">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
