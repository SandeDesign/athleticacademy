import { motion } from 'framer-motion';
import { ArrowRight, Clock, BookOpen, Users, Star, Play, Award } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface CourseCardProps {
  image: string;
  title: string;
  description: string;
  progress: number;
  category?: string;
  duration?: string;
  lessons?: number;
  rating?: number;
  students?: number;
  difficulty?: string;
  instructor?: string;
}

const CourseCard = ({ 
  image, 
  title, 
  description, 
  progress, 
  category = 'General',
  duration = '4 weeks',
  lessons = 12,
  rating = 4.5,
  students = 1000,
  difficulty = 'Beginner',
  instructor = 'Expert Instructor'
}: CourseCardProps) => {
  
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getCategoryColor = (cat: string) => {
    const colors = {
      'Fundamentals': 'bg-blue-500',
      'Strength': 'bg-orange-500',
      'Cardio': 'bg-red-500',
      'Nutrition': 'bg-green-500',
      'Mindfulness': 'bg-purple-500',
      'Meditation': 'bg-indigo-500',
      'Stress Management': 'bg-pink-500',
      'Goal Setting': 'bg-teal-500',
      'Resilience': 'bg-amber-500'
    };
    return colors[cat as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <Card className="group h-full flex flex-col overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl lg:hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 lg:hover:-translate-y-2">
      {/* Course Image */}
      <div className="relative h-48 lg:h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-2 lg:px-3 py-1 ${getCategoryColor(category)} text-white text-xs font-bold rounded-full shadow-lg`}>
            {category}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 lg:px-3 py-1 text-xs font-bold rounded-full ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 group-hover:scale-110 transition-transform duration-300">
            <Play className="h-8 w-8 lg:h-10 lg:w-10 text-white ml-1" />
          </div>
        </div>

        {/* Course Stats */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span className="font-semibold">{rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{students.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="flex-1 p-4 lg:p-6 flex flex-col">
        {/* Title and Description */}
        <div className="flex-1">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-3 lg:mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Course Details */}
        <div className="space-y-4">
          {/* Instructor */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Award className="h-3 w-3 lg:h-4 lg:w-4" />
            <span>by {instructor}</span>
          </div>

          {/* Course Info */}
          <div className="grid grid-cols-2 gap-2 lg:gap-4 text-xs lg:text-sm">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <BookOpen className="h-3 w-3 lg:h-4 lg:w-4" />
              <span>{lessons} lessons</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs lg:text-sm">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Progress</span>
              <span className="text-primary-600 dark:text-primary-400 font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 lg:h-2.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </motion.div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            {progress > 0 ? (
              <Button
                variant="primary"
                size="sm"
                isFullWidth
                icon={<ArrowRight className="h-4 w-4" />}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-sm lg:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue Learning
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                isFullWidth
                icon={<Play className="h-4 w-4" />}
                className="border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white text-sm lg:text-base font-semibold transition-all duration-300"
              >
                Start Course
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;