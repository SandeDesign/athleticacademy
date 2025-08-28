import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, ArrowLeft, Building, Key, Activity } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { brandConfig } from '../config/brand';

// Form validation schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError('');
    
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <img 
                  src="https://fl-group.org/wp-content/uploads/2025/08/logo.png" 
                  alt="Athletic Academy Logo" 
                  className="h-8 w-8 rounded object-contain"
                />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {brandConfig.name}
                </span>
              </div>
              <div className="w-5" /> {/* Spacer */}
            </div>
            <CardTitle className="text-center">Create Account</CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Join Athletic Academy and start your fitness journey
            </p>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">

              {/* Personal Information */}
              <div className="space-y-4">
                <Input
                  label="Name"
                  type="text"
                  icon={<User className="h-4 w-4" />}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Email"
                  type="email"
                  icon={<Mail className="h-4 w-4" />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label="Password"
                  type="password"
                  icon={<Lock className="h-4 w-4" />}
                  error={errors.password?.message}
                  {...register('password')}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  icon={<Lock className="h-4 w-4" />}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                size="lg"
                isFullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                Create Account
              </Button>
            </CardContent>

            <CardFooter>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 w-full">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;