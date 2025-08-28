import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  Download
} from 'lucide-react';
import Button from '../../components/ui/Button';

const HomePage = () => {
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>



        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h1 
                variants={itemVariants}
                className="text-6xl lg:text-7xl font-bold leading-tight mb-6"
              >
                <span className="text-red-500">ACHIEVE</span> MORE THAN JUST<br />
                FITNESS
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed"
              >
                Combine strength, flexibility and endurance in a community. 
                That values overall health and supportive growth.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Link to="/login">
                  <Button 
                    size="lg" 
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold uppercase tracking-wide"
                    icon={<ArrowRight className="h-5 w-5" />}
                  >
                    SIGN IN
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg uppercase tracking-wide"
                  icon={<Download className="h-5 w-5" />}
                  onClick={() => alert('PWA installation available via browser menu')}
                >
                  DOWNLOAD APP
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;