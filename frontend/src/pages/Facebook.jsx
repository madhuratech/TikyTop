import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PlatformHero from '../components/PlatformHero'
import useScrollToTop from '../hooks/useScrollToTop'

const Facebook = () => {
   useScrollToTop()
  const navigate = useNavigate()
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (username) => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      navigate('/profile-overview', {
        state: {
          platform: 'facebook',
          username
        }
      })
    }, 500)
  }

  return <PlatformHero platform="facebook" onSearch={handleSearch} isSearching={isSearching} />
}

export default Facebook
