import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

const ConversationsOverview = () => {
  const { user, getUserConversations, getAllUsers } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getUserConversations((convs) => {
      setConversations(convs);
      setLoading(false);
    });

    loadUsers();

    return unsubscribe;
  }, []);

  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers.filter(u => u.uid !== user?.uid));
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const getConversationName = (conversation: any) => {
    if (conversation.type === 'group') {
      return conversation.name;
    }
    
    // For DM, find the other participant
    const otherParticipantId = conversation.participants.find((id: string) => id !== user?.uid);
    const otherUser = users.find(u => u.uid === otherParticipantId);
    return otherUser?.displayName || 'Unknown User';
  };

  const getConversationAvatar = (conversation: any) => {
    if (conversation.type === 'group') {
      return conversation.name?.charAt(0) || 'G';
    }
    
    const otherParticipantId = conversation.participants.find((id: string) => id !== user?.uid);
    const otherUser = users.find(u => u.uid === otherParticipantId);
    return otherUser?.displayName?.charAt(0) || 'U';
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Gisteren';
    } else if (days < 7) {
      return `${days} dagen geleden`;
    } else {
      return date.toLocaleDateString('nl-NL');
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const name = getConversationName(conv).toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chats</h1>
        {user?.role === 'coach' && (
          <Button size="sm" icon={<Plus className="h-4 w-4" />}>
            Nieuwe Groep
          </Button>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Zoek gesprekken..."
            icon={<Search className="h-4 w-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Conversations List */}
      <div className="space-y-3">
        {filteredConversations.map((conversation) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/dashboard/chat/${conversation.id}`}>
              <Card className="hover:shadow-md transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      conversation.type === 'group' 
                        ? 'bg-gradient-to-br from-purple-500 to-indigo-500'
                        : 'bg-gradient-to-br from-primary-500 to-primary-600'
                    }`}>
                      {getConversationAvatar(conversation)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {getConversationName(conversation)}
                        </h3>
                        {conversation.lastMessageTime && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {conversation.lastMessage || 'Geen berichten'}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        {conversation.type === 'group' ? (
                          <Users className="h-3 w-3 text-gray-400" />
                        ) : (
                          <MessageCircle className="h-3 w-3 text-gray-400" />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {conversation.type === 'group' ? 'Groepschat' : 'Privé bericht'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredConversations.length === 0 && !loading && (
        <div className="text-center py-12">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Geen gesprekken
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start een gesprek door op "Chat" te klikken bij een gebruiker in de community.
          </p>
        </div>
      )}
    </div>
  );
};

export default ConversationsOverview;