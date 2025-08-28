import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Share2, Plus } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import UsersList from '../components/community/UsersList';
import ChatComponent from '../components/community/ChatComponent';

const CommunityPage = () => {
  const { addStatusUpdate, getAllStatusUpdates } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');
  const [statusText, setStatusText] = useState('');
  const [statusUpdates, setStatusUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'feed', name: 'Feed', icon: Heart },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'chat', name: 'Chat', icon: MessageCircle }
  ];

  useEffect(() => {
    loadStatusUpdates();
  }, []);

  const loadStatusUpdates = async () => {
    try {
      const updates = await getAllStatusUpdates();
      setStatusUpdates(updates);
    } catch (error) {
      console.error('Error loading status updates:', error);
      // Show user-friendly message instead of breaking the UI
      setStatusUpdates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusPost = async () => {
    if (statusText.trim()) {
      try {
        await addStatusUpdate(statusText);
        setStatusText('');
        await loadStatusUpdates(); // Reload updates
      } catch (error) {
        console.error('Error posting status:', error);
      }
    }
  };

  const renderFeed = () => (
    <div className="space-y-6">
      {/* Status Update Input */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <textarea
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              placeholder="What's on your mind? Share your fitness journey..."
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleStatusPost} disabled={!statusText.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Post Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Updates Feed */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {statusUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                      {update.userName?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {update.userName || 'Anonymous'}
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {statusUpdates.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No updates yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Be the first to share something with the community!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Community
        </h1>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'feed' && renderFeed()}
        {activeTab === 'users' && <UsersList />}
        {activeTab === 'chat' && <ChatComponent />}
      </motion.div>
    </div>
  );
};

export default CommunityPage;