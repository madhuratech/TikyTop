// Application Configuration

export const APP_NAME = 'Tiky Top';
export const APP_VERSION = '1.0.0';

const trimTrailingSlash = (value) => value?.replace(/\/+$/, '');

export const API_URL = trimTrailingSlash(import.meta.env.VITE_API_URL) || '/api';
export const SITE_URL = trimTrailingSlash(import.meta.env.VITE_SITE_URL) || window.location.origin;
export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

export const PLATFORMS = {
  TIKTOK: 'tiktok',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  YOUTUBE: 'youtube'
};

export const SERVICES = {
  VIEWS: 'views',
  FOLLOWERS: 'followers',
  SUBSCRIBERS: 'subscribers',
  LIKES: 'likes',
  COMMENTS: 'comments'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

export const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  NETBANKING: 'netbanking',
  WALLET: 'wallet'
};

export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  CART: 'cart',
  RECENT_ORDERS: 'recentOrders'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  MY_ORDERS: '/my-orders',
  TRACK_ORDER: '/track-order',
  FREE_TRIAL: '/free-trial'
};
