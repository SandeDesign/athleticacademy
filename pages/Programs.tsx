import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Clock, 
  Target, 
  Users, 
  Star,
  Play,
  BookOpen,
  Filter,
  Search,
  ChevronRight,
  Calendar,
  Trophy,
  Zap,
  Heart,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Strength' | 'Cardio' | 'Flexibility' | 'HIIT' | 'Yoga' | 'Recovery';
  workouts: number;
  rating: number;
  enrolled: number;
  image: string;
  trainer: string;
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Mock data voor trainingsprogramma's
  const programs: Program[] = [
    {
      id: '1',
      title: 'Full Body Strength Builder',
      description: 'Een complete krachttraining voor beginners die alle spiergroepen traint. Perfect om te starten met gewichtstraining.',
      duration: '8 weken',
      difficulty: 'Beginner',
      category: 'Strength',
      workouts: 24,
      rating: 4.8,
      enrolled: 1247,
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      trainer: 'Mike Johnson',
      tags: ['Krachttraining', 'Beginners', 'Full Body'],
      isPopular: true
    },
    {
      id: '2',
      title: 'HIIT Fat Burner',
      description: 'Intensieve interval training om snel vet te verbranden. Korte, krachtige workouts voor maximale resultaten.',
      duration: '6 weken',
      difficulty: 'Intermediate',
      category: 'HIIT',
      workouts: 18,
      rating: 4.9,
      enrolled: 892,
      image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
      trainer: 'Sarah Williams',
      tags: ['HIIT', 'Cardio', 'Vetverbranding'],
      isNew: true
    },
    {
      id: '3',
      title: 'Yoga Flow & Flexibility',
      description: 'Verbeter je flexibiliteit en vind innerlijke rust met deze yoga flows. Geschikt voor alle niveaus.',
      duration: '4 weken',
      difficulty: 'Beginner',
      category: 'Yoga',
      workouts: 16,
      rating: 4.7,
      enrolled: 634,
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      trainer: 'Emma Chen',
      tags: ['Yoga', 'Flexibiliteit', 'Mindfulness']
    },
    {
      id: '4',
      title: 'Advanced Powerlifting',
      description: 'Voor ervaren lifters die hun squat, bench press en deadlift naar het volgende niveau willen tillen.',
      duration: '12 weken',
      difficulty: 'Advanced',
      category: 'Strength',
      workouts: 36,
      rating: 4.9,
      enrolled: 423,
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400',
      trainer: 'David Rodriguez',
      tags: ['Powerlifting', 'Gevorderd', 'Kracht']
    },
    {
      id: '5',
      title: 'Cardio Endurance Challenge',
      description: 'Bouw je uithoudingsvermogen op met gevarieerde cardio workouts. Van hardlopen tot fietsen.',
      duration: '10 weken',
      difficulty: 'Intermediate',
      category: 'Cardio',
      workouts: 30,
      rating: 4.6,
      enrolled: 756,
      image: 'https://images.pexels.com/photos/2827400/pexels-photo-2827400.jpeg?auto=compress&cs=tinysrgb&w=400',
      trainer: 'Lisa Thompson',
      tags: ['Cardio', 'Uithoudingsvermogen', 'Running']
    },
    {
      id: '6',
      title: 'Recovery & Mobility',
      description: 'Herstel sneller en voorkom blessures met deze recovery-gerichte workouts en stretching routines.',
      duration: '6 weken',
      difficulty: 'Beginner',
      category: 'Recovery',
      workouts: 18,
      rating: 4.5,
      enrolled: 389,
      image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
      trainer: 'Alex Kim',
      tags: ['Recovery', 'Mobiliteit', 'Stretching']
    }
  ];

  const categories = ['All', 'Strength', 'Cardio', 'HIIT', 'Yoga', 'Flexibility', 'Recovery'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter programs based on search and filters
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || program.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Strength': return <Dumbbell className="h-4 w-4" />;
      case 'Cardio': return <Heart className="h-4 w-4" />;
      case 'HIIT': return <Zap className="h-4 w-4" />;
      case 'Yoga': return <Activity className="h-4 w-4" />;
      case 'Recovery': return <Target className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Training Programs
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Ontdek onze uitgebreide collectie trainingsprogramma's, ontworpen door experts om je fitnessdoelen te bereiken.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="w-full">
                <Input
                  placeholder="Zoek programma's..."
                  icon={<Search className="h-4 w-4" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categorie
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border rounded-lg border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Moeilijkheidsgraad
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border rounded-lg border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredPrograms.length} programma{filteredPrograms.length !== 1 ? "'s" : ""} gevonden
        </p>
      </motion.div>

      {/* Programs Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPrograms.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
              {/* Program Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {program.isPopular && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full flex items-center">
                      <Trophy className="h-3 w-3 mr-1" />
                      Populair
                    </span>
                  )}
                  {program.isNew && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      Nieuw
                    </span>
                  )}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>

                {/* Category Icon */}
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center space-x-1 text-white">
                    {getCategoryIcon(program.category)}
                    <span className="text-sm font-medium">{program.category}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Title and Rating */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {program.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                          {program.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({program.enrolled} deelnemers)
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Program Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{program.workouts} workouts</span>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(program.difficulty)}`}>
                      {program.difficulty}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      door {program.trainer}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {program.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      Start Programma
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredPrograms.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Geen programma's gevonden
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Probeer je zoekopdracht of filters aan te passen.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
          >
            Reset Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Programs;