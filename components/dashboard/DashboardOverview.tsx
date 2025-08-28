import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Brain, 
  ArrowRight, 
  TrendingUp, 
  Calendar, 
  Target,
  Zap,
  Award,
  Users,
  Clock,
  Star,
  Activity,
  BookOpen,
  Play
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';

const DashboardOverview = () => {
  const { user } = useAuth();
  const [hoveredCampus, setHoveredCampus] = useState<string | null>(null);

  const stats = [
    { label: 'Courses Completed', value: '12', icon: Award, color: 'text-green-500' },
    { label: 'Hours Trained', value: '48', icon: Clock, color: 'text-blue-500' },
    { label: 'Current Streak', value: '7 days', icon: TrendingUp, color: 'text-orange-500' },
    { label: 'Next Goal', value: '85%', icon: Target, color: 'text-purple-500' }
  ];

  const recentActivity = [
    { title: 'Completed: Foundation Strength', time: '2 hours ago', type: 'completion' },
    { title: 'Started: Mindfulness Basics', time: '1 day ago', type: 'start' },
    { title: 'Achievement: 7-day streak!', time: 'Today', type: 'achievement' }
  ];

  const quickActions = [
    { title: 'Continue Learning', subtitle: 'Pick up where you left off', icon: Play, href: '/dashboard/programs', gradient: 'from-blue-500 to-cyan-500' },
    { title: 'Browse Library', subtitle: 'Explore new courses', icon: BookOpen, href: '/dashboard/videos', gradient: 'from-purple-500 to-pink-500' },
    { title: 'Track Progress', subtitle: 'See your achievements', icon: TrendingUp, href: '/dashboard/progress', gradient: 'from-green-500 to-emerald-500' },
    { title: 'Join Community', subtitle: 'Connect with others', icon: Users, href: '/dashboard/community', gradient: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 text-white shadow-2xl"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                Welcome back, {user?.displayName?.split(' ') || 'Champion'}! 👋
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl text-white/90 mb-6"
              >
                Ready to transform your potential today?
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 text-white/80"
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-semibold">{stat.value}</span>
                    <span className="text-sm opacity-75">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden md:block"
            >
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Activity className="h-16 w-16 text-white/80" />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </motion.div>

      {/* Campus Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Campus
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Select your learning path and start your transformation journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Fysiek Campus */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onHoverStart={() => setHoveredCampus('fysiek')}
            onHoverEnd={() => setHoveredCampus(null)}
          >
            <Link to="/dashboard/campus/fysiek">
              <Card className={`group h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                hoveredCampus === 'fysiek' ? 'ring-4 ring-orange-500/50' : ''
              }`}>
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500"></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: hoveredCampus === 'fysiek' ? 1.1 : 1,
                        rotate: hoveredCampus === 'fysiek' ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Dumbbell className="h-20 w-20 md:h-24 md:w-24 text-white" />
                    </motion.div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-full">
                      Physical Training
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    Fysiek Campus
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                    Transform your body with expert-designed strength training, cardio programs, and nutrition guidance.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>12 Courses</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>8.5k Students</span>
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-orange-500 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Mentaal Campus */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onHoverStart={() => setHoveredCampus('mentaal')}
            onHoverEnd={() => setHoveredCampus(null)}
          >
            <Link to="/dashboard/campus/mentaal">
              <Card className={`group h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                hoveredCampus === 'mentaal' ? 'ring-4 ring-purple-500/50' : ''
              }`}>
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500"></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: hoveredCampus === 'mentaal' ? 1.1 : 1,
                        rotate: hoveredCampus === 'mentaal' ? -5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Brain className="h-20 w-20 md:h-24 md:w-24 text-white" />
                    </motion.div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-full">
                      Mental Training
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Mentaal Campus
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                    Develop mental resilience, mindfulness, and peak performance mindset with proven techniques.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>9 Courses</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>6.2k Students</span>
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-purple-500 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Jump right into your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Link to={action.href}>
                <Card className="group h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${action.gradient}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${action.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {action.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'completion' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                    activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {activity.type === 'completion' ? <Award className="h-4 w-4" /> :
                     activity.type === 'achievement' ? <Star className="h-4 w-4" /> :
                     <Play className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;