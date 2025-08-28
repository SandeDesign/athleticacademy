import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the page they tried to visit before being redirected to login
  const from = location.state?.from?.pathname || '/dashboard';

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError('');
    
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      {/* Simplified container - geen motion.div transform */}
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <img 
              src="https://fl-group.org/wp-content/uploads/2025/08/logo.png" 
              alt="Athletic Academy Logo" 
              className="w-10 h-10 rounded-xl object-contain bg-white p-1"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to Athletic Academy</p>
        </motion.div>

        <Card>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-50 border border-error-200 text-error-700 text-sm">
              {error}
            </div>
          )}

          {/* Form zonder transform properties */}
          <form 
            onSubmit={handleSubmit(onSubmit)}
            style={{ transform: 'none' }}
            className="relative z-10"
          >
            <CardContent className="space-y-4">
              {/* Direct input elements voor betere mobiele compatibiliteit */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    inputMode="email"
                    placeholder="you@example.com"
                    {...register('email')}
                    className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    style={{ 
                      fontSize: '16px',
                      transform: 'none',
                      WebkitAppearance: 'none',
                      zIndex: 999 
                    }}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...register('password')}
                    className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    style={{ 
                      fontSize: '16px',
                      transform: 'none',
                      WebkitAppearance: 'none',
                      zIndex: 999 
                    }}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                    Forgot password?
                  </a>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex-col">
              <Button 
                type="submit" 
                isFullWidth 
                isLoading={isLoading}
              >
                Sign in
              </Button>
              
              <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;