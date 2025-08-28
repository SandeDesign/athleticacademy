import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  Heart, 
  MessageCircle, 
  Share2,
  Plus,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { userId } = useParams();
  const { user: currentUser, getAllUsers, followUser, unfollowUser, addStatusUpdate, getAllStatusUpdates } = useAuth();
  const [profileUser, setProfileUser] = useState<any>(null);
  const [statusText, setStatusText] = useState('');
  const [statusUpdates, setStatusUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, [userId]);

  const loadProfileData = async () => {
    try {
      const users = await getAllUsers();
      const user = users.find(u => u.uid === userId);
      setProfileUser(user);
      
      // Load status updates for this user
      const allUpdates = await getAllStatusUpdates();
      const userUpdates = allUpdates.filter(update => update.userId === userId);
      setStatusUpdates(userUpdates);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const isOwnProfile = currentUser?.uid === userId;
  const isFollowing = currentUser?.following?.includes(userId || '');

  const handleFollow = async () => {
    if (!userId) return;
    
    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      // Reload profile data to update follower count
      await loadProfileData();
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  const handleStatusPost = async () => {
    if (statusText.trim()) {
      try {
        await addStatusUpdate(statusText);
        setStatusText('');
        await loadProfileData(); // Reload to show new status
      } catch (error) {
        console.error('Error posting status:', error);
      }
    }
  };

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

  if (!profileUser) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          User not found
        </h3>
        <Link to="/dashboard/community" className="text-primary-600 hover:text-primary-500">
          Back to Community
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/dashboard/community" className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Community</span>
      </Link>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
              {/* Avatar and Basic Info */}
              <div className="text-center md:text-left mb-6 md:mb-0">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold mx-auto md:mx-0 mb-4">
                  {profileUser.displayName?.charAt(0) || 'U'}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {profileUser.displayName || 'Anonymous'}
                </h1>
                <span className={`inline-block px-3 py-1 text-sm rounded-full ${getRoleColor(profileUser.role)} mb-4`}>
                  {getRoleLabel(profileUser.role)}
                </span>
                
                {/* Action Buttons */}
                {!isOwnProfile && (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button
                      onClick={handleFollow}
                      variant={isFollowing ? "secondary" : "primary"}
                      icon={isFollowing ? <Users className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline" icon={<MessageCircle className="h-4 w-4" />}>
                      Message
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {profileUser.email}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{profileUser.followers?.length || 0}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{profileUser.following?.length || 0}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{statusUpdates.length}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Posts</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Status Updates Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Status Input (only for own profile) */}
            {isOwnProfile && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <textarea
                  value={statusText}
                  onChange={(e) => setStatusText(e.target.value)}
                  placeholder="Share an update with your followers..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <Button onClick={handleStatusPost} disabled={!statusText.trim()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Update
                  </Button>
                </div>
              </div>
            )}

            {/* Status Updates */}
            <div className="space-y-6">
              {statusUpdates.map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {profileUser.displayName?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {profileUser.displayName || 'Anonymous'}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {update.timestamp?.toLocaleString() || 'Unknown time'}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {update.content}
                      </p>
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{update.likes?.length || 0}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{update.comments?.length || 0}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {statusUpdates.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No posts yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isOwnProfile ? 'Share your first update!' : 'This user hasn\'t posted anything yet.'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfilePage;