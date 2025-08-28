import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc, collection, getDocs, addDoc, updateDoc, arrayUnion, arrayRemove, query, orderBy, onSnapshot, where } from 'firebase/firestore';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'student' | 'coach' | 'admin';
  photoURL?: string;
  followers?: string[];
  following?: string[];
  statusUpdates?: StatusUpdate[];
}

export interface StatusUpdate {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  userName: string;
  userRole: string;
}

export interface Conversation {
  id: string;
  type: 'dm' | 'group';
  participants: string[];
  name?: string;
  description?: string;
  adminId?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  createdAt: Date;
}

export interface ConversationMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  userName: string;
  userRole: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string, role: 'student' | 'coach' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  getAllUsers: () => Promise<AuthUser[]>;
  followUser: (targetUserId: string) => Promise<void>;
  unfollowUser: (targetUserId: string) => Promise<void>;
  addStatusUpdate: (content: string) => Promise<void>;
  getAllStatusUpdates: () => Promise<StatusUpdate[]>;
  sendChatMessage: (content: string) => Promise<void>;
  getChatMessages: (callback: (messages: ChatMessage[]) => void) => () => void;
  getOrCreateDirectConversation: (targetUserId: string) => Promise<string>;
  createGroupChat: (name: string, description: string, memberIds: string[]) => Promise<string>;
  getUserConversations: (callback: (conversations: Conversation[]) => void) => () => void;
  sendMessageToConversation: (conversationId: string, content: string) => Promise<void>;
  getConversationMessages: (conversationId: string, callback: (messages: ConversationMessage[]) => void) => () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const initializedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        // Set persistence first
        await setPersistence(auth, browserLocalPersistence);
        
        // Then listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (!isMounted) return;

          try {
            if (firebaseUser) {
              // User is signed in
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
              
              let userData;
              if (userDoc.exists()) {
                userData = userDoc.data();
              } else {
                // Create user document if it doesn't exist
                userData = {
                  role: 'student',
                  followers: [],
                  following: [],
                  statusUpdates: []
                };
                await setDoc(doc(db, 'users', firebaseUser.uid), userData);
              }

              const authUser: AuthUser = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                role: userData.role || 'student',
                photoURL: firebaseUser.photoURL || undefined,
                followers: userData.followers || [],
                following: userData.following || [],
                statusUpdates: userData.statusUpdates || []
              };

              setUser(authUser);
            } else {
              // User is signed out
              setUser(null);
            }
          } catch (error) {
            console.error('Error in auth state change:', error);
            if (firebaseUser) {
              // Fallback user object
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                role: 'student',
                followers: [],
                following: [],
                statusUpdates: []
              });
            } else {
              setUser(null);
            }
          } finally {
            if (!initializedRef.current) {
              initializedRef.current = true;
              setLoading(false);
            }
          }
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
        return () => {};
      }
    };

    const unsubscribePromise = initializeAuth();

    return () => {
      isMounted = false;
      unsubscribePromise.then(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
    };
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, displayName: string, role: 'student' | 'coach' | 'admin' = 'student') => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(firebaseUser, { displayName });
    
    const newUser: AuthUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName,
      role,
      followers: [],
      following: [],
      statusUpdates: []
    };
    
    await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserProfile = async (displayName: string) => {
    if (!auth.currentUser) throw new Error('No authenticated user');
    
    await updateProfile(auth.currentUser, { displayName });
    await updateDoc(doc(db, 'users', auth.currentUser.uid), { displayName });
    setUser(prev => prev ? { ...prev, displayName } : null);
  };

  const getAllUsers = async (): Promise<AuthUser[]> => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      return usersSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      } as AuthUser));
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const followUser = async (targetUserId: string) => {
    if (!user) throw new Error('No authenticated user');
    
    await updateDoc(doc(db, 'users', user.uid), {
      following: arrayUnion(targetUserId)
    });
    
    await updateDoc(doc(db, 'users', targetUserId), {
      followers: arrayUnion(user.uid)
    });
    
    setUser(prev => prev ? {
      ...prev,
      following: [...(prev.following || []), targetUserId]
    } : null);
  };

  const unfollowUser = async (targetUserId: string) => {
    if (!user) throw new Error('No authenticated user');
    
    await updateDoc(doc(db, 'users', user.uid), {
      following: arrayRemove(targetUserId)
    });
    
    await updateDoc(doc(db, 'users', targetUserId), {
      followers: arrayRemove(user.uid)
    });
    
    setUser(prev => prev ? {
      ...prev,
      following: (prev.following || []).filter(id => id !== targetUserId)
    } : null);
  };

  const addStatusUpdate = async (content: string) => {
    if (!user) throw new Error('No authenticated user');
    
    const statusUpdate = {
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      content,
      timestamp: new Date(),
      likes: [],
      comments: []
    };
    
    await addDoc(collection(db, 'statusUpdates'), statusUpdate);
  };

  const getAllStatusUpdates = async (): Promise<StatusUpdate[]> => {
    try {
      const updatesQuery = query(collection(db, 'statusUpdates'), orderBy('timestamp', 'desc'));
      const updatesSnapshot = await getDocs(updatesQuery);
      return updatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      } as StatusUpdate));
    } catch (error) {
      console.error('Error fetching status updates:', error);
      return [];
    }
  };

  const sendChatMessage = async (content: string) => {
    if (!user) throw new Error('No authenticated user');
    
    const message = {
      userId: user.uid,
      content,
      timestamp: new Date(),
      userName: user.displayName || 'Anonymous',
      userRole: user.role
    };
    
    await addDoc(collection(db, 'chatMessages'), message);
  };

  const getChatMessages = (callback: (messages: ChatMessage[]) => void) => {
    const messagesQuery = query(collection(db, 'chatMessages'), orderBy('timestamp', 'asc'));
    
    return onSnapshot(messagesQuery, 
      (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate()
        } as ChatMessage));
        callback(messages);
      },
      (error) => {
        console.error('Error listening to chat messages:', error);
        callback([]);
      }
    );
  };

  const getOrCreateDirectConversation = async (targetUserId: string): Promise<string> => {
    if (!user) throw new Error('No authenticated user');
    
    const participants = [user.uid, targetUserId].sort();
    
    const conversationsQuery = query(
      collection(db, 'conversations'),
      where('type', '==', 'dm'),
      where('participants', '==', participants)
    );
    
    const existingConversations = await getDocs(conversationsQuery);
    
    if (!existingConversations.empty) {
      return existingConversations.docs[0].id;
    }
    
    const newConversation = {
      type: 'dm',
      participants,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'conversations'), newConversation);
    return docRef.id;
  };

  const createGroupChat = async (name: string, description: string, memberIds: string[]): Promise<string> => {
    if (!user) throw new Error('No authenticated user');
    
    const newConversation = {
      type: 'group',
      name,
      description,
      adminId: user.uid,
      participants: [user.uid, ...memberIds],
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'conversations'), newConversation);
    return docRef.id;
  };

  const getUserConversations = (callback: (conversations: Conversation[]) => void) => {
    if (!user) {
      callback([]);
      return () => {};
    }
    
    const conversationsQuery = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(conversationsQuery,
      (snapshot) => {
        const conversations = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          lastMessageTime: doc.data().lastMessageTime?.toDate()
        } as Conversation));
        callback(conversations);
      },
      (error) => {
        console.error('Error listening to conversations:', error);
        callback([]);
      }
    );
  };

  const sendMessageToConversation = async (conversationId: string, content: string) => {
    if (!user) throw new Error('No authenticated user');
    
    const message = {
      userId: user.uid,
      content,
      timestamp: new Date(),
      userName: user.displayName || 'Anonymous',
      userRole: user.role
    };
    
    await addDoc(collection(db, 'conversations', conversationId, 'messages'), message);
    
    await updateDoc(doc(db, 'conversations', conversationId), {
      lastMessage: content,
      lastMessageTime: new Date()
    });
  };

  const getConversationMessages = (conversationId: string, callback: (messages: ConversationMessage[]) => void) => {
    const messagesQuery = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );
    
    return onSnapshot(messagesQuery,
      (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate()
        } as ConversationMessage));
        callback(messages);
      },
      (error) => {
        console.error('Error listening to conversation messages:', error);
        callback([]);
      }
    );
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
    getAllUsers,
    followUser,
    unfollowUser,
    addStatusUpdate,
    getAllStatusUpdates,
    sendChatMessage,
    getChatMessages,
    getOrCreateDirectConversation,
    createGroupChat,
    getUserConversations,
    sendMessageToConversation,
    getConversationMessages
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};