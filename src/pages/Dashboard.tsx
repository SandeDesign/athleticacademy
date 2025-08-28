import { useState } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Home,
  Dumbbell,
  Video,
  Calendar,
  TrendingUp,
  Users,
  MessageCircle,
  BookOpen,
  Target,
  Trophy,
  Settings,
  Menu,
  X,
  ChevronRight,
  Brain,
  Sparkles,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UserSettings from '../components/dashboard/UserSettings';
import NotificationCenter from '../components/dashboard/NotificationCenter';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import FysiekCampusPage from '../pages/FysiekCampusPage';
import MentaalCampusPage from '../pages/MentaalCampusPage';
import Programs from '../pages/Programs';
import CommunityPage from '../pages/CommunityPage';
import ProfilePage from '../pages/ProfilePage';
import ConversationsOverview from '../components/chat/ConversationsOverview';
import ConversationDetail from '../components/chat/ConversationDetail';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  // Mobile navigation - Bottom Tab Bar
  const mobileNavigation = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      color: 'text-blue-500'
    },
    {
      id: 'programs',
      name: 'Programs',
      href: '/dashboard/programs',
      icon: BookOpen,
      color: 'text-orange-500'
    },
    {
      id: 'chat',
      name: 'Chat',
      href: '/dashboard/chat',
      icon: MessageCircle,
      color: 'text-purple-500'
    },
    {
      id: 'progress',
      name: 'Progress',
      href: '/dashboard/progress',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      id: 'settings',
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      color: 'text-gray-500'
    }
  ];

  // Main navigation items
  const desktopMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Programs', href: '/dashboard/programs', icon: BookOpen },
    { name: 'Video Library', href: '/dashboard/videos', icon: Video },
    { name: 'Schedules', href: '/dashboard/schedules', icon: Calendar },
    { name: 'Community', href: '/dashboard/community', icon: Users },
    { name: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
    { name: 'Trainers', href: '/dashboard/trainers', icon: Target },
    { name: 'Goals', href: '/dashboard/goals', icon: Trophy },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings }
  ];

  // Coach/Trainer menu items
  if (user?.role === 'coach' || user?.role === 'admin') {
    desktopMenuItems.unshift(
      { name: 'Content Management', href: '/dashboard/coach/content', icon: Sparkles },
      { name: 'My Students', href: '/dashboard/coach/students', icon: Users }
    );
  }

  // Admin-only menu items
  if (user?.role === 'admin') {
    desktopMenuItems.unshift(
      { name: 'Admin Panel', href: '/dashboard/admin/panel', icon: Shield },
      { name: 'User Management', href: '/dashboard/admin/users', icon: Users }
    );
  }

  const getCurrentPageTitle = () => {
    if (location.pathname.startsWith('/dashboard/campus/fysiek')) return 'Fysiek Campus';
    if (location.pathname.startsWith('/dashboard/campus/mentaal')) return 'Mentaal Campus';
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/dashboard/programs': return 'Programs';
      case '/dashboard/videos': return 'Videos';
      case '/dashboard/community': return 'Community';
      case '/dashboard/progress': return 'Progress';
      case '/dashboard/chat': return 'Chat';
      case '/dashboard/trainers': return 'Trainers';
      case '/dashboard/goals': return 'Goals';
      case '/dashboard/settings': return 'Settings';
      case '/dashboard/admin/panel': return 'Admin Panel';
      case '/dashboard/admin/users': return 'User Management';
      case '/dashboard/coach/content': return 'Content Management';
      case '/dashboard/coach/students': return 'My Students';
      default: return 'Athletic Academy';
    }
  };

  const isCurrentCampus = (campus: 'fysiek' | 'mentaal') => {
    return location.pathname.startsWith(`/dashboard/campus/${campus}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-2xl fixed inset-y-0 left-0 z-50">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="https://fl-group.org/wp-content/uploads/2025/08/logo.png"
                alt="Athletic Academy Logo"
                className="w-10 h-10 rounded-xl object-contain bg-white p-1.5 shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Athletic Academy
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Transform Your Potential
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-3">
            Navigation
          </h3>
          {desktopMenuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 ${
                location.pathname === item.href
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`h-4 w-4 ${
                  location.pathname === item.href ? 'text-white' : 'text-gray-500 group-hover:text-primary-500'
                }`} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 group"
          >
            <svg className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="px-4 lg:px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Left: Mobile Menu + Title */}
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(true)}
                  className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </button>

                {/* Page Title */}
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {getCurrentPageTitle()}
                  </h1>
                  <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                    Welcome back, {user?.displayName?.split(' ') || 'User'}
                  </p>
                </div>
              </div>

              {/* Right: Campus Switcher + Notifications */}
              <div className="flex items-center space-x-3">
                {/* Campus Switcher - Header (Always visible) */}
                <div className="flex items-center space-x-2">
                  <Link
                    to="/dashboard/campus/fysiek"
                    className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 ${
                      isCurrentCampus('fysiek')
                        ? 'bg-gradient-to-br from-primary-500 to-red-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                    }`}
                  >
                    <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                  <Link
                    to="/dashboard/campus/mentaal"
                    className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 ${
                      isCurrentCampus('mentaal')
                        ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                    }`}
                  >
                    <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </div>
                
                <NotificationCenter />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile side menu (overlay) */}
        <AnimatePresence>
          {showMobileMenu && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
                onClick={() => setShowMobileMenu(false)}
              />

              {/* Menu Panel */}
              <div className="fixed left-0 top-0 bottom-0 z-50 lg:hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="h-full w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl"
                >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://fl-group.org/wp-content/uploads/2025/08/logo.png"
                      alt="Athletic Academy Logo"
                      className="w-10 h-10 rounded-xl object-contain bg-white p-1 shadow-lg"
                    />
                    <div>
                      <h2 className="font-bold text-gray-900 dark:text-white">Athletic Academy</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.displayName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto py-4">
                  <nav className="space-y-2 px-6">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Navigation</h3>
                    {desktopMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setShowMobileMenu(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                          location.pathname === item.href || (item.href === '/dashboard' && location.pathname === '/dashboard')
                            ? 'bg-primary-500 text-white shadow-lg'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-5 w-5" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </nav>

                  {/* Sign Out */}
                  <div className="mt-8 mx-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <button
                      onClick={logout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Main content area for routes */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8">
          <div className="px-4 lg:px-6 py-4 lg:py-6">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/campus/fysiek" element={<FysiekCampusPage />} />
              <Route path="/campus/mentaal" element={<MentaalCampusPage />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/chat" element={<ConversationsOverview />} />
              <Route path="/chat/:conversationId" element={<ConversationDetail />} />
              <Route path="/videos" element={<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"><h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Video Library</h2><p className="text-gray-600 dark:text-gray-400">Training videos will appear here.</p></div>} />
              <Route path="/schedules" element={<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"><h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Training Schedules</h2><p className="text-gray-600 dark:text-gray-400">Your training schedules will appear here.</p></div>} />
              <Route path="/progress" element={<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"><h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Progress Tracking</h2><p className="text-gray-600 dark:text-gray-400">Your progress will appear here.</p></div>} />
              <Route path="/trainers" element={<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"><h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Trainers</h2><p className="text-gray-600 dark:text-gray-400">Trainer information will appear here.</p></div>} />
              <Route path="/goals" element={<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"><h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Goals & Challenges</h2><p className="text-gray-600 dark:text-gray-400">Your goals and challenges will appear here.</p></div>} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/coach/content" element={<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"><h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Content Management</h2><p className="text-gray-600 dark:text-gray-400">Manage your training content here.</p></div>} />
              <Route path="/coach/students" element={<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"><h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Students</h2><p className="text-gray-600 dark:text-gray-400">Overview of your students.</p></div>} />
              <Route path="/admin/panel" element={<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"><h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Admin Panel</h2><p className="text-gray-600 dark:text-gray-400">Admin control panel.</p></div>} />
              <Route path="/admin/users" element={<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"><h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Management</h2><p className="text-gray-600 dark:text-gray-400">Manage all users.</p></div>} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Bottom tab bar - Mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 px-2 py-2 lg:hidden shadow-2xl">
        <div className="flex items-center justify-around">
          {mobileNavigation.map((tab) => {
            const isActive = location.pathname === tab.href ||
              (tab.id === 'dashboard' && location.pathname === '/dashboard') ||
              (tab.id === 'programs' && location.pathname.startsWith('/dashboard/programs')) ||
              (tab.id === 'community' && location.pathname.startsWith('/dashboard/community')) ||
              (tab.id === 'chat' && location.pathname.startsWith('/dashboard/chat')) ||
              (tab.id === 'progress' && location.pathname.startsWith('/dashboard/progress')) ||
              (tab.id === 'settings' && location.pathname.startsWith('/dashboard/settings'));

            return (
              <Link
                key={tab.id}
                to={tab.href}
                className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-xl transition-all min-w-0 flex-1 ${
                  isActive
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon className={`h-5 w-5 mb-1 ${
                  isActive ? 'text-white' : tab.color
                }`} />
                <span className={`text-xs font-semibold truncate ${
                  isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {tab.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;