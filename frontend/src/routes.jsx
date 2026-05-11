import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import ChangePassword from './pages/ChangePassword';
import Account from './pages/Account';
import TikTok from './pages/TikTok';
import Instagram from './pages/Instagram';
import Facebook from './pages/Facebook';
import YouTube from './pages/YouTube';
import ProfileOverview from './pages/ProfileOverview';
import PostsSelection from './pages/PostsSelection';
import QuantityPricing from './pages/QuantityPricing';
import Payment from './pages/Payment';
import Processing from './pages/Processing';
import Complete from './pages/Complete';
import Track from './pages/Track';
import FreeTrial from './pages/FreeTrial';
import FreeService from './pages/FreeService';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/my-orders" element={<Orders />} />
      <Route path="/password" element={<ChangePassword />} />
      <Route path="/account" element={<Account />} />
      <Route path="/tiktok" element={<TikTok />} />
      <Route path="/instagram" element={<Instagram />} />
      <Route path="/facebook" element={<Facebook />} />
      <Route path="/youtube" element={<YouTube />} />
      <Route path="/profile-overview" element={<ProfileOverview />} />
      <Route path="/posts-selection" element={<PostsSelection />} />
      <Route path="/quantity-pricing" element={<QuantityPricing />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/processing" element={<Processing />} />
      <Route path="/complete" element={<Complete />} />
      <Route path="/track" element={<Track />} />
      <Route path="/free-trial" element={<FreeTrial />} />
      <Route path="/free-service" element={<FreeService />} />
    </Routes>
  );
}
