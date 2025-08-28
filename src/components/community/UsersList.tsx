import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserCheck, MessageCircle, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const UsersList = () => {
  const { user: currentUser, getAllUsers, followUser, unfollowUser, getOrCreateDirectConversation } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'coaches' | 'students'>('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      // Filter out current user
      const otherUsers = allUsers.filter(u => u.uid !== currentUser?.uid);
      setUsers(otherUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      const isCurrentlyFollowing = currentUser?.following?.includes(userId);
      
      if (isCurrentlyFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      
      // Update local state
      setUsers(prev => prev.map(user => 
        user.uid === userId 
          ? { 
              ...user, 
              followers: isCurrentlyFollowing 
                ? (user.followers || []).filter((id: string) => id !== currentUser?.uid)
                : [...(user.followers || []), currentUser?.uid]
            }
          : user
      ));
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  const handleStartChat = async (userId: string) => {
    try {
      const conversationId = await getOrCreateDirectConversation(userId);
      window.location.href = `/dashboard/chat/${conversationId}`;
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'coaches') return user.role === 'coach' || user.role === 'admin';
    if (filter === 'students') return user.role === 'student';
    return true;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'coach': return 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400';
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'coach': return 'Coach';
      case 'admin': return 'Admin';
      default: return 'Student';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        {[
          { id: 'all', name: 'All Users', icon: Users },
          { id: 'coaches', name: 'Coaches', icon: Award },
          { id: 'students', name: 'Students', icon: Users }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filter === tab.id
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.uid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Link to={`/dashboard/profile/${user.uid}`}>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3 group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                  </Link>
                  <Link to={`/dashboard/profile/${user.uid}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
                      {user.displayName || 'Anonymous'}
                    </h3>
                  </Link>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{user.followers?.length || 0}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{user.following?.length || 0}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={currentUser?.following?.includes(user.uid) ? "secondary" : "primary"}
                    onClick={() => handleFollow(user.uid)}
                    className="flex-1"
                    icon={currentUser?.following?.includes(user.uid) ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                  >
                    {currentUser?.following?.includes(user.uid) ? 'Unfollow' : 'Follow'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<MessageCircle className="h-4 w-4" />}
                    onClick={() => handleStartChat(user.uid)}
                  >
                    Chat
                  </Button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                  {user.email}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No users found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filter to see more users.
          </p>
        </div>
      )}
    </div>
  );
};

export default UsersList;