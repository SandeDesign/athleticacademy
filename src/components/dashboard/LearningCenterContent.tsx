import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, Bookmark, Filter, Star, Play, Users, TrendingUp, Award, Zap } from 'lucide-react';
import Input from '../ui/Input';
import CourseCard from './CourseCard';

interface LearningCenterContentProps {
  campusName: string;
}

const LearningCenterContent = ({ campusName }: LearningCenterContentProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Enhanced mock data voor cursuskaarten
  const courses = [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Foundation: Your Fitness Journey Begins',
      description: 'Master the fundamentals of fitness with our comprehensive beginner program. Learn proper form, build strength, and establish healthy habits that last.',
      progress: 75,
      category: 'Fundamentals',
      duration: '4 weeks',
      lessons: 12,
      rating: 4.9,
      students: 2847,
      difficulty: 'Beginner',
      instructor: 'Sarah Johnson'
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Strength Lab: Build Muscle & Power',
      description: 'Advanced strength training techniques to maximize muscle growth and power development. Perfect for intermediate to advanced athletes.',
      progress: 40,
      category: 'Strength',
      duration: '8 weeks',
      lessons: 24,
      rating: 4.8,
      students: 1923,
      difficulty: 'Advanced',
      instructor: 'Mike Rodriguez'
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Cardio Mastery: Endurance & Conditioning',
      description: 'Transform your cardiovascular fitness with scientifically-backed training methods. Boost endurance and burn fat efficiently.',
      progress: 90,
      category: 'Cardio',
      duration: '6 weeks',
      lessons: 18,
      rating: 4.7,
      students: 3156,
      difficulty: 'Intermediate',
      instructor: 'Emma Chen'
    },
    {
      id: '4',
      image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Nutrition Mastery: Fuel Your Performance',
      description: 'Learn how to optimize your nutrition for peak performance, recovery, and body composition. Evidence-based meal planning included.',
      progress: 60,
      category: 'Nutrition',
      duration: '5 weeks',
      lessons: 15,
      rating: 4.9,
      students: 2634,
      difficulty: 'Beginner',
      instructor: 'Dr. Lisa Thompson'
    },
    {
      id: '5',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Mindfulness Foundations: Mental Clarity',
      description: 'Develop mental resilience and focus through proven mindfulness techniques. Reduce stress and enhance performance.',
      progress: 20,
      category: 'Mindfulness',
      duration: '4 weeks',
      lessons: 16,
      rating: 4.8,
      students: 1847,
      difficulty: 'Beginner',
      instructor: 'Alex Kim'
    },
    {
      id: '6',
      image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Meditation Mastery: Daily Practice',
      description: 'Build a sustainable meditation practice with guided sessions and advanced techniques for stress management and focus.',
      progress: 80,
      category: 'Meditation',
      duration: '6 weeks',
      lessons: 21,
      rating: 4.9,
      students: 2156,
      difficulty: 'Intermediate',
      instructor: 'Maya Patel'
    },
    {
      id: '7',
      image: 'https://images.pexels.com/photos/398669/pexels-photo-398669.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Stress Management: Peak Performance',
      description: 'Master stress management techniques used by elite athletes and high performers. Build unshakeable mental toughness.',
      progress: 55,
      category: 'Stress Management',
      duration: '7 weeks',
      lessons: 20,
      rating: 4.7,
      students: 1634,
      difficulty: 'Advanced',
      instructor: 'Dr. James Wilson'
    },
    {
      id: '8',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Goal Setting: Achieve Your Dreams',
      description: 'Learn the science of goal setting and achievement. Create actionable plans and develop the mindset of champions.',
      progress: 70,
      category: 'Goal Setting',
      duration: '3 weeks',
      lessons: 9,
      rating: 4.8,
      students: 2847,
      difficulty: 'Beginner',
      instructor: 'Rachel Green'
    },
    {
      id: '9',
      image: 'https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Resilience Training: Unbreakable Mind',
      description: 'Develop mental resilience and bounce back stronger from setbacks. Essential skills for long-term success.',
      progress: 30,
      category: 'Resilience',
      duration: '8 weeks',
      lessons: 24,
      rating: 4.9,
      students: 1456,
      difficulty: 'Advanced',
      instructor: 'Tony Martinez'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'in-progress', name: 'In Progress', icon: Clock },
    { id: 'bookmarked', name: 'Bookmarked', icon: Bookmark },
    { id: 'popular', name: 'Popular', icon: TrendingUp },
    { id: 'new', name: 'New', icon: Zap }
  ];

  const getCampusGradient = () => {
    if (campusName.includes('Fysiek')) {
      return 'from-orange-500 to-red-500';
    } else if (campusName.includes('Mentaal')) {
      return 'from-purple-500 to-indigo-500';
    }
    return 'from-blue-500 to-indigo-500';
  };

  const getCampusIcon = () => {
    if (campusName.includes('Fysiek')) {
      return '🏋️';
    } else if (campusName.includes('Mentaal')) {
      return '🧠';
    }
    return '🎯';
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'in-progress') return matchesSearch && course.progress > 0 && course.progress < 100;
    if (activeFilter === 'popular') return matchesSearch && course.students > 2000;
    if (activeFilter === 'new') return matchesSearch && course.rating >= 4.8;
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br ${getCampusGradient()} p-6 lg:p-8 text-white shadow-2xl`}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                <span className="text-3xl lg:text-4xl">{getCampusIcon()}</span>
                <h1 className="text-2xl lg:text-4xl font-bold">{campusName}</h1>
              </div>
              <p className="text-lg lg:text-xl text-white/90 mb-4 lg:mb-6 max-w-2xl">
                Transform your potential with world-class courses designed by industry experts. 
                Your journey to excellence starts here.
              </p>
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span className="text-sm lg:text-base font-medium">15,000+ Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 lg:h-5 lg:w-5 fill-current" />
                  <span className="text-sm lg:text-base font-medium">4.8 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span className="text-sm lg:text-base font-medium">Expert Instructors</span>
                </div>
              </div>
            </div>
            <div className="hidden xl:block mt-6 lg:mt-0">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play className="h-16 w-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 lg:w-64 lg:h-64 bg-white/5 rounded-full -translate-y-16 translate-x-16 lg:-translate-y-32 lg:translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 lg:w-48 lg:h-48 bg-white/5 rounded-full translate-y-12 -translate-x-12 lg:translate-y-24 lg:-translate-x-24"></div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-4 lg:p-6"
      >
        <div className="space-y-4 lg:space-y-6">
          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search courses, topics, or instructors..."
              icon={<Search className="h-5 w-5" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-base lg:text-lg py-3 lg:py-4 pl-12 bg-gray-50 dark:bg-gray-900 border-0 focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 lg:gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl text-sm lg:text-base font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? `bg-gradient-to-r ${getCampusGradient()} text-white shadow-lg`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <filter.icon className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>{filter.name}</span>
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 font-medium">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
            </p>
            <button className="hidden lg:flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">More Filters</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Course Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 xl:gap-8"
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <CourseCard
              image={course.image}
              title={course.title}
              description={course.description}
              progress={course.progress}
              category={course.category}
              duration={course.duration}
              lessons={course.lessons}
              rating={course.rating}
              students={course.students}
              difficulty={course.difficulty}
              instructor={course.instructor}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 lg:py-16"
        >
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 lg:h-12 lg:w-12 text-gray-400" />
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No courses found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 lg:mb-8 max-w-md mx-auto">
            We couldn't find any courses matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('all');
            }}
            className={`px-6 lg:px-8 py-2.5 lg:py-3 bg-gradient-to-r ${getCampusGradient()} text-white rounded-lg lg:rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default LearningCenterContent;