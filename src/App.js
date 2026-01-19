import React, { useState, useEffect, useRef } from 'react';

const API_URL = 'http://localhost:3001/api';

const Fame8Logo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="fame8Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <path d="M24 4C17.4 4 12 8.5 12 14c0 3.5 2 6.5 5 8.5-4 2.5-7 6.5-7 11.5 0 6.6 6.3 12 14 12s14-5.4 14-12c0-5-3-9-7-11.5 3-2 5-5 5-8.5 0-5.5-5.4-10-12-10zm0 6c3.3 0 6 2.2 6 5s-2.7 5-6 5-6-2.2-6-5 2.7-5 6-5zm0 28c-4.4 0-8-3.1-8-7s3.6-7 8-7 8 3.1 8 7-3.6 7-8 7z" fill="url(#fame8Gradient)"/>
    <path d="M36 8l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="url(#starGradient)"/>
  </svg>
);

const Icons = {
  Video: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  X: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  Home: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Folder: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  Globe: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Trend: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  Logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  Send: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  Download: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Play: () => <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>,
  Pause: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>,
  Zap: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Target: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Sparkles: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  ArrowRight: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
  Star: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  Lock: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Instagram: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/></svg>,
  Youtube: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  Twitter: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  Linkedin: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  Tiktok: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  Loader: () => <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>,
};

const DOMAIN = 'fame8.app';

// API helper
const api = {
  token: localStorage.getItem('fame8_token'),
  
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('fame8_token', token);
    } else {
      localStorage.removeItem('fame8_token');
    }
  },

  async request(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options.headers }
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }
    
    return res.json();
  },

  // Auth
  register: (data) => api.request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => api.request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => api.request('/auth/me'),

  // Brands
  getBrands: () => api.request('/brands'),
  createBrand: (data) => api.request('/brands', { method: 'POST', body: JSON.stringify(data) }),
  deleteBrand: (id) => api.request(`/brands/${id}`, { method: 'DELETE' }),

  // Videos
  getVideos: (brandId) => api.request(`/brands/${brandId}/videos`),
  createVideo: (brandId, data) => api.request(`/brands/${brandId}/videos`, { method: 'POST', body: JSON.stringify(data) }),
  postVideo: (id, platforms) => api.request(`/videos/${id}/post`, { method: 'POST', body: JSON.stringify({ platforms }) }),
  deleteVideo: (id) => api.request(`/videos/${id}`, { method: 'DELETE' }),

  // Topics
  getTopics: (brandId) => api.request(`/brands/${brandId}/topics`),
  generateTopics: (brandId) => api.request(`/brands/${brandId}/topics/generate`, { method: 'POST' }),

  // Stats
  getStats: () => api.request('/stats'),
};

export default function App() {
  const [page, setPage] = useState('landing');
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState('starter');
  const [activeTab, setActiveTab] = useState('home');
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [videos, setVideos] = useState([]);
  const [topics, setTopics] = useState([]);
  const [stats, setStats] = useState({ total_videos: 0, total_posts: 0, total_brands: 0 });
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [videoTopic, setVideoTopic] = useState('');
  const [playingVideo, setPlayingVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('fame8_token');
    if (token) {
      api.setToken(token);
      loadUserData();
    }
  }, []);

  // Load user data
  const loadUserData = async () => {
    try {
      setLoading(true);
      const userData = await api.getMe();
      setUser(userData);
      setPage('dashboard');
      await loadDashboardData();
    } catch (error) {
      api.setToken(null);
      showToast('Session expired, please login again', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      const [brandsData, statsData] = await Promise.all([
        api.getBrands(),
        api.getStats()
      ]);
      setBrands(brandsData);
      setStats(statsData);
      if (brandsData.length > 0 && !selectedBrand) {
        setSelectedBrand(brandsData[0]);
      }
    } catch (error) {
      showToast('Failed to load data', 'error');
    }
  };

  // Load brand-specific data when brand changes
  useEffect(() => {
    if (selectedBrand) {
      loadBrandData(selectedBrand.id);
    }
  }, [selectedBrand]);

  const loadBrandData = async (brandId) => {
    try {
      const [videosData, topicsData] = await Promise.all([
        api.getVideos(brandId),
        api.getTopics(brandId)
      ]);
      setVideos(videosData);
      setTopics(topicsData);
    } catch (error) {
      console.error('Failed to load brand data:', error);
    }
  };

  const limits = {
    starter: { videos: 2, brands: 1, download: false },
    pro: { videos: 50, brands: 5, download: true },
    business: { videos: 999, brands: 999, download: true }
  };
  const currentLimits = limits[userPlan];

  const handleLogin = async (email, password, name) => {
    try {
      setLoading(true);
      let result;
      if (authMode === 'signup') {
        if (!name) { showToast('Please enter your name', 'error'); return; }
        result = await api.register({ email, password, name });
      } else {
        result = await api.login({ email, password });
      }
      api.setToken(result.token);
      setUser(result.user);
      setPage('dashboard');
      await loadDashboardData();
      showToast('Welcome to Fame8!');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.setToken(null);
    setUser(null);
    setBrands([]);
    setSelectedBrand(null);
    setVideos([]);
    setTopics([]);
    setActiveTab('home');
    setPage('landing');
    showToast('Logged out');
  };

  const handleCreateBrand = async (name, niche) => {
    if (brands.length >= currentLimits.brands) {
      showToast('Upgrade for more brands', 'error');
      return;
    }
    try {
      setLoading(true);
      const newBrand = await api.createBrand({ name, niche });
      setBrands(prev => [...prev, newBrand]);
      setSelectedBrand(newBrand);
      setShowModal(null);
      showToast('Brand created!');
      // Load topics for new brand
      const topicsData = await api.getTopics(newBrand.id);
      setTopics(topicsData);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async (topic) => {
    if (!topic?.trim()) { showToast('Enter a topic', 'error'); return; }
    if (!selectedBrand) { showToast('Select a brand first', 'error'); return; }
    if (videos.length >= currentLimits.videos) { showToast('Upgrade for more videos', 'error'); return; }
    
    try {
      setLoading(true);
      const newVideo = await api.createVideo(selectedBrand.id, { topic: topic.trim() });
      setVideos(prev => [...prev, newVideo]);
      setVideoTopic('');
      setActiveTab('videos');
      showToast('Video is being generated...');
      
      // Poll for video status
      const pollInterval = setInterval(async () => {
        const updatedVideos = await api.getVideos(selectedBrand.id);
        setVideos(updatedVideos);
        const video = updatedVideos.find(v => v.id === newVideo.id);
        if (video && video.status === 'ready') {
          clearInterval(pollInterval);
          showToast('Video ready!');
        }
      }, 2000);
      
      // Stop polling after 30 seconds
      setTimeout(() => clearInterval(pollInterval), 30000);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePostVideo = async (id) => {
    try {
      setLoading(true);
      await api.postVideo(id, ['instagram', 'youtube', 'tiktok']);
      setVideos(prev => prev.map(v => v.id === id ? { ...v, status: 'posted' } : v));
      setPlayingVideo(null);
      showToast('Posted to all platforms!');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadVideo = () => {
    if (!currentLimits.download) { showToast('Upgrade to Pro to download', 'error'); return; }
    showToast('Video downloaded!');
  };

  const handleGenerateTopics = async () => {
    if (!selectedBrand) { showToast('Select a brand first', 'error'); return; }
    try {
      setLoading(true);
      const newTopics = await api.generateTopics(selectedBrand.id);
      setTopics(prev => [...prev, ...newTopics]);
      showToast('New topics generated!');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = () => { setUserPlan('pro'); showToast('Upgraded to Pro! 🎉'); };

  const Toast = () => toast && (
    <div className={`fixed top-4 right-4 z-[100] px-4 py-3 rounded-xl text-white font-medium shadow-lg ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>{toast.msg}</div>
  );

  // VIDEO PLAYER MODAL
  const VideoPlayerModal = () => playingVideo && (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setPlayingVideo(null)}>
      <div className="bg-slate-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="aspect-video bg-black relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-blue-600/30 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                  <span className="text-4xl">🎬</span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">{playingVideo.title || playingVideo.topic}</h3>
                <p className="text-purple-300">AI-Generated Short Video</p>
              </div>
            </div>
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'}} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-3">
              <button className="text-white hover:text-purple-400"><Icons.Pause /></button>
              <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full w-3/5" />
              </div>
              <span className="text-white text-sm font-mono">0:18 / 0:30</span>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">{playingVideo.title || playingVideo.topic}</p>
              <p className="text-slate-400 text-sm">Generated by Fame8 AI • 30 seconds • 1080p</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleDownloadVideo} className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 text-sm flex items-center gap-2">
                <Icons.Download /> Download
              </button>
              {playingVideo.status === 'ready' && (
                <button onClick={() => handlePostVideo(playingVideo.id)} disabled={loading} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50">
                  {loading ? <Icons.Loader /> : <Icons.Send />} Post
                </button>
              )}
              <button onClick={() => setPlayingVideo(null)} className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-sm">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // LANDING PAGE
  if (page === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Toast />
        <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-2 flex-shrink-0"><Fame8Logo size={36} /><span className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Fame8</span></div>
              <div className="flex items-center gap-8">
                <button onClick={() => scrollTo(featuresRef)} className="text-sm text-slate-300 hover:text-white whitespace-nowrap">Features</button>
                <button onClick={() => scrollTo(howItWorksRef)} className="text-sm text-slate-300 hover:text-white whitespace-nowrap">How it Works</button>
                <button onClick={() => scrollTo(pricingRef)} className="text-sm text-slate-300 hover:text-white whitespace-nowrap">Pricing</button>
                <button onClick={() => scrollTo(faqRef)} className="text-sm text-slate-300 hover:text-white whitespace-nowrap">FAQ</button>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={() => { setAuthMode('login'); setPage('auth'); }} className="px-4 py-2 text-sm text-slate-300 hover:text-white whitespace-nowrap">Log in</button>
              <button onClick={() => { setAuthMode('signup'); setPage('auth'); }} className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 font-medium text-sm whitespace-nowrap">Get Started</button>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-8">
              <Icons.Zap /><span>AI-Powered Video Creation</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">Create Videos<span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">10X Faster with AI</span></h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">We handle everything from researching trending topics, generating scripts, creating videos, and posting across all your social media platforms automatically.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button onClick={() => { setAuthMode('signup'); setPage('auth'); }} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold text-lg flex items-center justify-center gap-2">Start Creating Free <Icons.ArrowRight /></button>
            </div>
            <div className="flex items-center justify-center gap-6 text-slate-400 mb-16">
              <div className="flex -space-x-3">{[1,2,3,4,5].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-slate-950" />)}</div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-amber-400">{[1,2,3,4,5].map(i => <Icons.Star key={i} />)}</div>
                <span className="text-sm">2,000+ creators trust Fame8</span>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-1 shadow-2xl shadow-purple-500/20">
                <div className="rounded-xl overflow-hidden bg-slate-950">
                  <div className="bg-slate-800 px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 mx-4"><div className="bg-slate-700 rounded-lg px-4 py-1.5 text-sm text-slate-400 text-center max-w-xs mx-auto">app.{DOMAIN}</div></div>
                  </div>
                  <div className="flex min-h-[400px]">
                    <div className="w-56 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
                      <div className="flex items-center gap-3 mb-8"><Fame8Logo size={32} /><span className="font-bold text-lg bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Fame8</span></div>
                      <div className="space-y-2 flex-1">
                        {['Dashboard', 'Videos', 'Topics', 'Brands', 'Social'].map((item, i) => (
                          <div key={item} className={`px-4 py-2.5 rounded-xl text-sm font-medium ${i === 0 ? 'bg-purple-500/20 text-purple-400' : 'text-slate-500'}`}>{item}</div>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-slate-800 mt-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-sm font-bold">S</div>
                          <div><p className="text-sm font-medium text-white">Sarah</p><p className="text-xs text-slate-500">Pro Plan</p></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-6 bg-slate-950">
                      <div className="rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 p-6 mb-6">
                        <p className="font-bold text-white text-xl">Welcome back, Sarah! 👋</p>
                        <p className="text-purple-100 mt-1">Create AI videos and post across all platforms.</p>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mb-6">
                        {[{ label: 'Videos', value: '12' }, { label: 'Posted', value: '8' }, { label: 'Brands', value: '2' }, { label: 'Topics', value: '24' }].map(stat => (
                          <div key={stat.label} className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
                            <p className="text-slate-400 text-sm">{stat.label}</p>
                            <p className="font-bold text-2xl mt-1 text-white">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[{ title: '5 Marketing Tips', color: 'from-pink-500/30 to-purple-500/30' }, { title: 'AI Trends 2024', color: 'from-blue-500/30 to-cyan-500/30' }, { title: 'Growth Hacks', color: 'from-amber-500/30 to-orange-500/30' }].map((video, i) => (
                          <div key={i} className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                            <div className={`aspect-video bg-gradient-to-br ${video.color} flex items-center justify-center`}>
                              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                <div className="w-0 h-0 ml-1 border-l-[10px] border-l-white border-y-[6px] border-y-transparent" />
                              </div>
                            </div>
                            <div className="p-3"><p className="text-sm font-medium text-white">{video.title}</p><p className="text-xs mt-1 text-emerald-400">● Ready</p></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-slate-500 mb-8">Trusted by content creators at</p>
            <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
              {['Google', 'Meta', 'Netflix', 'Spotify', 'Adobe'].map(name => <span key={name} className="text-2xl font-bold text-slate-600">{name}</span>)}
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16"><h2 className="text-4xl font-bold mb-4">Content Creation, Made Easy</h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{ icon: Icons.Target, title: 'Idea Generation', desc: 'AI-powered topic recommendations.' }, { icon: Icons.Sparkles, title: 'Smart Scripting', desc: 'Scripts optimized for your audience.' }, { icon: Icons.Video, title: 'Video Generation', desc: 'High-quality reels with voice-overs.' }, { icon: Icons.Globe, title: 'Auto Publishing', desc: 'Post across all platforms.' }].map((f, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4"><f.icon /></div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-slate-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={howItWorksRef} className="py-24 px-6 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16"><h2 className="text-4xl font-bold mb-4">How It Works</h2><p className="text-xl text-slate-400">Three simple steps to viral content</p></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[{ step: '01', title: 'Create Your Brand', desc: 'Set up your brand with niche, tone, and target audience.' }, { step: '02', title: 'Generate Content', desc: 'Our AI suggests topics and creates videos for your brand.' }, { step: '03', title: 'Post Everywhere', desc: 'Post to all your social platforms instantly with one click.' }].map((s, i) => (
                <div key={i} className="relative">
                  <div className="text-8xl font-bold bg-gradient-to-b from-slate-800 to-transparent bg-clip-text text-transparent absolute -top-4 -left-4">{s.step}</div>
                  <div className="relative p-6 pt-12"><h3 className="text-2xl font-semibold mb-3">{s.title}</h3><p className="text-slate-400">{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Post Everywhere</h2>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {[{ icon: Icons.Instagram, name: 'Instagram', color: 'from-pink-500 to-purple-500' }, { icon: Icons.Youtube, name: 'YouTube', color: 'from-red-500 to-red-600' }, { icon: Icons.Tiktok, name: 'TikTok', color: 'from-slate-700 to-slate-900' }, { icon: Icons.Twitter, name: 'Twitter/X', color: 'from-slate-600 to-slate-800' }, { icon: Icons.Linkedin, name: 'LinkedIn', color: 'from-blue-600 to-blue-700' }].map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-3"><div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white`}><p.icon /></div><span className="text-slate-400">{p.name}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section ref={pricingRef} className="py-24 px-6 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16"><h2 className="text-4xl font-bold mb-4">Simple Pricing</h2></div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[{ name: 'Starter', price: 'Free', features: ['2 videos/month', '1 brand', '2 socials'], popular: false }, { name: 'Pro', price: '$29', features: ['50 videos/month', '5 brands', 'Unlimited socials', 'Downloads'], popular: true }, { name: 'Business', price: '$99', features: ['Unlimited videos', 'Unlimited brands', 'Team features'], popular: false }].map((p, i) => (
                <div key={i} className={`rounded-2xl p-8 ${p.popular ? 'bg-gradient-to-b from-purple-600/20 to-indigo-600/20 border-2 border-purple-500 scale-105' : 'bg-slate-900/50 border border-slate-800'}`}>
                  {p.popular && <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-sm font-medium mb-4">Most Popular</span>}
                  <h3 className="text-2xl font-bold">{p.name}</h3>
                  <div className="mt-4 mb-6"><span className="text-5xl font-bold">{p.price}</span>{p.price !== 'Free' && <span className="text-slate-400">/mo</span>}</div>
                  <ul className="space-y-3 mb-8">{p.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-slate-300"><span className="text-emerald-400"><Icons.Check /></span>{f}</li>)}</ul>
                  <button onClick={() => { setAuthMode('signup'); setPage('auth'); }} className={`w-full py-3 rounded-xl font-semibold ${p.popular ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-slate-800'}`}>Get Started</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={faqRef} className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16"><h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2></div>
            <div className="space-y-4">
              {[{ q: 'How can Fame8 help my startup?', a: 'Fame8 helps maintain a consistent social media presence without the daily grind of creating and posting content manually.' }, { q: 'Which platforms does Fame8 support?', a: 'We support Instagram, YouTube, TikTok, Twitter/X, and LinkedIn with more platforms coming soon.' }, { q: 'Do you offer a free trial?', a: 'Yes! Our Starter plan is completely free with 2 videos per month. No credit card required.' }, { q: 'Can I download videos?', a: 'Video downloads are available on Pro and Business plans. Starter plan users can post directly to social platforms.' }].map((item, i) => (
                <div key={i} className="rounded-xl bg-slate-900/50 border border-slate-800 p-6 hover:border-purple-500/30 transition-colors">
                  <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
                  <p className="text-slate-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 p-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Create Amazing Content?</h2>
              <p className="text-xl text-purple-100 mb-8">Join thousands of creators using AI to grow their audience</p>
              <button onClick={() => { setAuthMode('signup'); setPage('auth'); }} className="px-8 py-4 rounded-xl bg-white text-purple-600 font-semibold text-lg hover:bg-purple-50 transition-colors">Get Started Free →</button>
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2"><Fame8Logo size={32} /><span className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Fame8</span></div>
            <p className="text-slate-500">© 2024 {DOMAIN}</p>
          </div>
        </footer>
      </div>
    );
  }

  // AUTH PAGE
  if (page === 'auth') {
    return (
      <div className="min-h-screen bg-slate-950 flex">
        <Toast />
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 flex-col justify-between p-12">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('landing')}><Fame8Logo size={48} /><span className="text-3xl font-bold text-white">Fame8</span></div>
          <div><h1 className="text-5xl font-bold text-white leading-tight">Create Videos<br /><span className="text-pink-200">10X Faster</span><br />with AI</h1></div>
          <div className="flex items-center gap-4"><div className="flex -space-x-3">{[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white/20" />)}</div><span className="text-purple-100/80">2,000+ creators</span></div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <button onClick={() => setPage('landing')} className="lg:hidden flex items-center gap-2 text-slate-400 mb-8">← Back</button>
            <div className="lg:hidden flex items-center gap-3 mb-8"><Fame8Logo size={40} /><span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Fame8</span></div>
            <h2 className="text-3xl font-bold text-white mb-2">{authMode === 'login' ? 'Welcome back' : 'Create account'}</h2>
            <p className="text-slate-400 mb-8">{authMode === 'login' ? 'Sign in to continue' : 'Start creating in minutes'}</p>
            <div className="space-y-4">
              {authMode === 'signup' && <div><label className="block text-sm text-slate-400 mb-2">Name</label><input id="auth-name" type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none" /></div>}
              <div><label className="block text-sm text-slate-400 mb-2">Email</label><input id="auth-email" type="email" placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none" /></div>
              <div><label className="block text-sm text-slate-400 mb-2">Password</label><input id="auth-pass" type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none" /></div>
              <button 
                onClick={() => { 
                  const email = document.getElementById('auth-email')?.value; 
                  const password = document.getElementById('auth-pass')?.value;
                  const name = authMode === 'signup' ? document.getElementById('auth-name')?.value : null; 
                  if (!email || !password) { showToast('Enter email and password', 'error'); return; } 
                  handleLogin(email, password, name); 
                }} 
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Icons.Loader /> : null}
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </div>
            <p className="mt-6 text-center text-slate-400">{authMode === 'login' ? "No account? " : "Have account? "}<button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-purple-400 font-semibold">{authMode === 'login' ? 'Sign up' : 'Sign in'}</button></p>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Toast />
      <VideoPlayerModal />
      
      <aside className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800"><div className="flex items-center gap-3"><Fame8Logo size={40} /><span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Fame8</span></div></div>
        <div className="p-4 border-b border-slate-800">
          <label className="text-xs text-slate-500 font-medium">ACTIVE BRAND</label>
          <select value={selectedBrand?.id || ''} onChange={(e) => setSelectedBrand(brands.find(b => b.id === e.target.value) || null)} className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm outline-none">
            <option value="">Select brand</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[{ id: 'home', label: 'Dashboard', icon: Icons.Home }, { id: 'videos', label: 'Videos', icon: Icons.Video }, { id: 'topics', label: 'Topics', icon: Icons.Trend }, { id: 'brands', label: 'Brands', icon: Icons.Folder }, { id: 'social', label: 'Social', icon: Icons.Globe }].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl ${activeTab === item.id ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:bg-slate-800'}`}><item.icon /><span>{item.label}</span></button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-800/50 mb-4">
            <div className="flex items-center justify-between mb-2"><span className="text-xs text-slate-400">Plan</span><span className={`text-xs px-2 py-0.5 rounded-full ${userPlan === 'starter' ? 'bg-slate-600' : 'bg-gradient-to-r from-pink-500 to-purple-500'}`}>{userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}</span></div>
            <p className="text-sm text-slate-300">{videos.length}/{currentLimits.videos} videos</p>
            {userPlan === 'starter' && <button onClick={handleUpgrade} className="w-full mt-2 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-xs font-medium">Upgrade to Pro</button>}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-bold">{user?.name?.[0]?.toUpperCase()}</div>
            <div className="flex-1 min-w-0"><p className="font-medium truncate">{user?.name}</p><p className="text-xs text-slate-500 truncate">{user?.email}</p></div>
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-slate-800"><Icons.Logout /></button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="rounded-2xl p-8 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"><h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1><p className="text-purple-100">Create AI videos and post everywhere.</p></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ label: 'Videos', value: stats.total_videos, tab: 'videos' }, { label: 'Posted', value: stats.total_posts, tab: 'videos' }, { label: 'Brands', value: stats.total_brands, tab: 'brands' }, { label: 'Topics', value: topics.length, tab: 'topics' }].map(s => (
                <div key={s.label} onClick={() => setActiveTab(s.tab)} className="rounded-2xl p-6 bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 cursor-pointer"><p className="text-sm text-slate-400">{s.label}</p><p className="text-3xl font-bold mt-1">{s.value}</p></div>
              ))}
            </div>
            {!selectedBrand && <div className="rounded-2xl p-12 text-center border-2 border-dashed border-slate-700"><p className="text-slate-400 mb-4">Create a brand to start</p><button onClick={() => setShowModal('brand')} className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold">Create Brand</button></div>}
            {selectedBrand && videos.length === 0 && <div className="rounded-2xl p-12 text-center border-2 border-dashed border-slate-700"><p className="text-slate-400 mb-4">Now create your first video!</p><button onClick={() => setActiveTab('videos')} className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold">Generate Video</button></div>}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="rounded-2xl p-6 bg-slate-900/50 border border-slate-800">
              <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Generate New Video</h3><span className="text-sm text-slate-400">{videos.length}/{currentLimits.videos}</span></div>
              <div className="flex gap-3">
                <input type="text" value={videoTopic} onChange={(e) => setVideoTopic(e.target.value)} placeholder={selectedBrand ? "Enter a topic..." : "Select a brand first"} disabled={!selectedBrand || loading} onKeyDown={(e) => e.key === 'Enter' && handleGenerateVideo(videoTopic)} className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 outline-none disabled:opacity-50" />
                <button onClick={() => handleGenerateVideo(videoTopic)} disabled={!selectedBrand || loading} className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold flex items-center gap-2 disabled:opacity-50">
                  {loading ? <Icons.Loader /> : <Icons.Sparkles />} Generate
                </button>
              </div>
              {!selectedBrand && <p className="mt-3 text-sm text-amber-400">Please <button onClick={() => setActiveTab('brands')} className="underline">create a brand</button> first.</p>}
            </div>
            {videos.length === 0 ? (
              <div className="rounded-2xl p-12 text-center border-2 border-dashed border-slate-700"><p className="text-slate-400">No videos yet. Enter a topic above!</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map(video => (
                  <div key={video.id} className="rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800">
                    <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center cursor-pointer" onClick={() => video.status !== 'generating' && video.status !== 'pending' && setPlayingVideo(video)}>
                      {(video.status === 'generating' || video.status === 'pending') ? (
                        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                          <Icons.Play />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h4 className="font-medium">{video.title || video.topic}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${video.status === 'ready' ? 'bg-emerald-500/20 text-emerald-400' : video.status === 'posted' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>{video.status}</span>
                      </div>
                      {video.status === 'ready' && (
                        <div className="flex gap-2">
                          <button onClick={handleDownloadVideo} className={`flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${currentLimits.download ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-800 text-slate-500'}`}>{currentLimits.download ? <Icons.Download /> : <Icons.Lock />} Download</button>
                          <button onClick={() => handlePostVideo(video.id)} disabled={loading} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                            {loading ? <Icons.Loader /> : <Icons.Send />} Post
                          </button>
                        </div>
                      )}
                      {video.status === 'posted' && <p className="text-sm text-emerald-400 text-center py-2">✓ Posted to all platforms</p>}
                      {(video.status === 'generating' || video.status === 'pending') && <p className="text-sm text-blue-400 text-center py-2">Generating...</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">AI Topic Suggestions</h3>
              <button onClick={handleGenerateTopics} disabled={!selectedBrand || loading} className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-medium flex items-center gap-2 disabled:opacity-50">
                {loading ? <Icons.Loader /> : null} Generate Topics
              </button>
            </div>
            {!selectedBrand && <div className="rounded-2xl p-6 bg-amber-500/10 border border-amber-500/20"><p className="text-amber-400">Please <button onClick={() => setActiveTab('brands')} className="underline font-semibold">create a brand</button> first.</p></div>}
            {topics.length === 0 ? <div className="rounded-2xl p-12 text-center border-2 border-dashed border-slate-700"><p className="text-slate-400">No topics yet.</p></div> : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topics.map(t => (
                  <div key={t.id} className="rounded-2xl p-5 bg-slate-900/50 border border-slate-800 flex justify-between items-start">
                    <div className="flex-1 mr-4"><span className={`text-xs px-2 py-1 rounded-full ${(t.trending_score || 0) > 70 ? 'bg-emerald-500/20 text-emerald-400' : (t.trending_score || 0) > 40 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-500/20 text-slate-400'}`}>{(t.trending_score || 0) > 70 ? '🔥 Hot' : (t.trending_score || 0) > 40 ? '📈 Trending' : '💡 Idea'}</span><h4 className="font-medium mt-2">{t.title}</h4></div>
                    <button onClick={() => handleGenerateVideo(t.title)} disabled={loading} className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 disabled:opacity-50"><Icons.Video /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'brands' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div><h3 className="text-lg font-semibold">Your Brands</h3><p className="text-sm text-slate-400">{brands.length}/{currentLimits.brands}</p></div>
              <button onClick={() => brands.length >= currentLimits.brands ? showToast('Upgrade for more brands', 'error') : setShowModal('brand')} className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-medium flex items-center gap-2"><Icons.Plus /> New Brand</button>
            </div>
            {brands.length === 0 ? <div className="rounded-2xl p-12 text-center border-2 border-dashed border-slate-700"><p className="text-slate-400 mb-4">No brands yet.</p><button onClick={() => setShowModal('brand')} className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold">Create Brand</button></div> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {brands.map(brand => (
                  <div key={brand.id} onClick={() => { setSelectedBrand(brand); showToast(`Switched to ${brand.name}`); }} className={`rounded-2xl p-5 cursor-pointer ${selectedBrand?.id === brand.id ? 'bg-purple-500/10 border-2 border-purple-500' : 'bg-slate-900/50 border border-slate-800 hover:border-purple-500/30'}`}>
                    <div className="flex justify-between mb-3"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xl font-bold">{brand.name[0].toUpperCase()}</div>{selectedBrand?.id === brand.id && <span className="text-purple-400"><Icons.Check /></span>}</div>
                    <h4 className="font-semibold">{brand.name}</h4><span className="text-xs px-2 py-1 rounded-full bg-slate-800 mt-2 inline-block">{brand.niche}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            <div><h3 className="text-lg font-semibold">Connect Social Accounts</h3><p className="text-sm text-slate-400">{userPlan === 'starter' ? '2 max' : 'Unlimited'}</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{ name: 'Instagram', icon: Icons.Instagram, color: 'from-pink-500 to-purple-500', connected: true, handle: '@demo' }, { name: 'YouTube', icon: Icons.Youtube, color: 'from-red-500 to-red-600', connected: true, handle: '@demo' }, { name: 'TikTok', icon: Icons.Tiktok, color: 'from-slate-700 to-slate-900', connected: false, locked: userPlan === 'starter' }, { name: 'Twitter/X', icon: Icons.Twitter, color: 'from-slate-600 to-slate-800', connected: false, locked: userPlan === 'starter' }, { name: 'LinkedIn', icon: Icons.Linkedin, color: 'from-blue-600 to-blue-700', connected: false, locked: userPlan === 'starter' }].map(p => (
                <div key={p.name} className="rounded-2xl p-6 bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center gap-4 mb-4"><div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${p.color} flex items-center justify-center text-white`}><p.icon /></div><div><h4 className="font-semibold">{p.name}</h4><p className={`text-sm ${p.connected ? 'text-emerald-400' : 'text-slate-500'}`}>{p.connected ? p.handle : p.locked ? 'Pro required' : 'Not connected'}</p></div></div>
                  {p.locked ? <button onClick={handleUpgrade} className="w-full py-2 rounded-xl bg-slate-700/50 text-slate-400 text-sm flex items-center justify-center gap-2"><Icons.Lock /> Upgrade</button> : <button onClick={() => showToast(p.connected ? 'Disconnected' : 'Connected!')} className={`w-full py-2 rounded-xl text-sm font-medium ${p.connected ? 'bg-emerald-500/20 text-emerald-400' : `bg-gradient-to-r ${p.color} text-white`}`}>{p.connected ? '✓ Connected' : 'Connect'}</button>}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {showModal === 'brand' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowModal(null)}>
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-800 flex justify-between items-center"><h3 className="text-xl font-semibold">Create Brand</h3><button onClick={() => setShowModal(null)} className="p-2 rounded-lg hover:bg-slate-800"><Icons.X /></button></div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm text-slate-400 mb-2">Brand Name</label><input id="brand-name" type="text" placeholder="e.g. Tech Daily" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 outline-none" autoFocus /></div>
              <div><label className="block text-sm text-slate-400 mb-2">Niche</label><select id="brand-niche" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 outline-none"><option>Technology</option><option>Finance</option><option>Fitness</option><option>Marketing</option><option>Education</option><option>Entertainment</option><option>Food</option><option>Travel</option></select></div>
            </div>
            <div className="p-6 border-t border-slate-800 flex gap-3">
              <button onClick={() => setShowModal(null)} className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700">Cancel</button>
              <button onClick={() => { const name = document.getElementById('brand-name')?.value; const niche = document.getElementById('brand-niche')?.value; if (!name?.trim()) { showToast('Enter brand name', 'error'); return; } handleCreateBrand(name.trim(), niche); }} disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Icons.Loader /> : null} Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
