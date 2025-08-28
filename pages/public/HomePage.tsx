import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Users, 
  TrendingUp,
  ArrowRight,
  Download,
  UserPlus,
  Dumbbell,
  Brain
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { brandConfig } from '../../config/brand';
import InstallPrompt from '../../components/InstallPrompt';

const HomePage = () => {
  const features = [
    {
      icon: Dumbbell,
      title: 'Fysieke Training',
      description: 'Krachtraining, cardio en flexibiliteit programma\'s afgestemd op jouw niveau.'
    },
    {
      icon: Brain,
      title: 'Mentale Groei',
      description: 'Mindfulness, meditatie en mental coaching voor complete welzijn.'
    },
    {
      icon: Target,
      title: 'Persoonlijke Doelen',
      description: 'Stel doelen en track je vooruitgang met onze geavanceerde tools.'
    },
    {
      icon: Users,
      title: 'Expert Coaching',
      description: 'Directe toegang tot gecertificeerde trainers en mentale coaches.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 lg:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex justify-center mb-8">
                <img 
                  src="https://fl-group.org/wp-content/uploads/2025/08/logo.png" 
                  alt="Athletic Academy Logo" 
                  className="h-24 w-24 rounded-3xl shadow-2xl object-contain bg-white p-3"
                />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Athletic Academy
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Transform je lichaam én geest. Bereik meer dan alleen fitness.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold"
                  icon={<UserPlus className="h-5 w-5" />}
                >
                  Start Gratis
                </Button>
              </Link>
              
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                >
                  Login
                </Button>
              </Link>
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm text-gray-500">
              Geen creditcard vereist • 30 dagen gratis proberen
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Fysiek & Mentaal
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-3xl mx-auto">
              Twee campussen. Één doel. Complete transformatie.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full bg-gray-800 border-gray-700 hover:border-red-500 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {[
              { number: '10K+', label: 'Actieve Atleten' },
              { number: '500+', label: 'Training Programs' },
              { number: '98%', label: 'Succes Rate' }
            ].map((stat, index) => (
              <motion.div key={stat.label} variants={itemVariants}>
                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Begin Je Transformatie
            </h2>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Sluit je aan bij duizenden atleten die hun grenzen al hebben doorbroken
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold"
                  icon={<UserPlus className="h-5 w-5" />}
                >
                  Nu Starten
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="lg"
                className="text-white border-2 border-white hover:bg-white hover:text-red-500 px-8 py-4 text-lg"
                icon={<Download className="h-5 w-5" />}
                onClick={() => alert('PWA installatie beschikbaar via browser menu')}
              >
                Download App
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <InstallPrompt />
    </div>
  );
};

export default HomePage;