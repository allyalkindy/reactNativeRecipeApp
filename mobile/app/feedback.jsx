import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSettings } from '../context/SettingsContext';
import SafeScreen from '../components/SafeScreen';
import BackButton from '../components/BackButton';

const STORAGE_KEY = '@feedback_posts';

const Feedback = () => {
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [feedbackPosts, setFeedbackPosts] = useState([]);
  const [postType, setPostType] = useState('Feedback'); // 'Feedback' or 'Complaint'
  const { getTheme } = useSettings();
  const theme = getTheme();

  // Load feedback posts when component mounts
  useEffect(() => {
    loadFeedbackPosts();
  }, []);

  const loadFeedbackPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedPosts) {
        setFeedbackPosts(JSON.parse(storedPosts));
      } else {
        // If no stored posts, set initial posts
        const initialPosts = [
          {
            id: 1,
            user: 'John Doe',
            type: 'Feedback',
            content: 'The recipe search feature is amazing! Found exactly what I was looking for.',
            timestamp: '2 hours ago',
          },
          {
            id: 2,
            user: 'Sarah Smith',
            type: 'Complaint',
            content: 'The app sometimes freezes when loading high-resolution images. Please fix this.',
            timestamp: '5 hours ago',
          },
          {
            id: 3,
            user: 'Mike Johnson',
            type: 'Feedback',
            content: 'Would love to see more vegetarian recipes in the collection!',
            timestamp: '1 day ago',
          },
        ];
        setFeedbackPosts(initialPosts);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
      }
    } catch (error) {
      console.error('Error loading feedback posts:', error);
    }
  };

  const handlePost = async () => {
    if (newPost.trim()) {
      try {
        const newFeedback = {
          id: Date.now(), // Use timestamp as ID for uniqueness
          user: 'Current User',
          type: postType,
          content: newPost.trim(),
          timestamp: 'Just now',
        };
        const updatedPosts = [newFeedback, ...feedbackPosts];
        setFeedbackPosts(updatedPosts);
        // Save to AsyncStorage
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        setShowNewPostModal(false);
        setNewPost('');
      } catch (error) {
        console.error('Error saving feedback post:', error);
      }
    }
  };

  const renderPost = (post) => (
    <View key={post.id} style={[styles.postCard, { backgroundColor: theme.card, shadowColor: theme.shadow }] }>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.background }] }>
            <Ionicons name="person-circle" size={40} color={theme.primary} />
          </View>
          <View>
            <Text style={[styles.userName, { color: theme.text }]}>{post.user}</Text>
            <Text style={[styles.timestamp, { color: theme.textLight }]}>{post.timestamp}</Text>
          </View>
        </View>
        <View style={[
          styles.typeBadge,
          { backgroundColor: post.type === 'Feedback' ? theme.success : theme.error }
        ]}>
          <Text style={[styles.typeText, { color: theme.white }]}>{post.type}</Text>
        </View>
      </View>
      <Text style={[styles.postContent, { color: theme.text }]}>{post.content}</Text>
    </View>
  );

  return (
    <SafeScreen>
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Feedback & Complaints</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 12, marginHorizontal: 20, marginBottom: 20 }}>
          <TouchableOpacity
            style={[styles.newPostButton, { backgroundColor: theme.primary, shadowColor: theme.shadow, flex: 1 }]}
            onPress={() => { setShowNewPostModal(true); setPostType('Feedback'); }}
          >
            <Ionicons name="add-circle" size={24} color={theme.white} />
            <Text style={[styles.newPostButtonText, { color: theme.white }]}>Add Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.newPostButton, { backgroundColor: theme.error, shadowColor: theme.shadow, flex: 1 }]}
            onPress={() => { setShowNewPostModal(true); setPostType('Complaint'); }}
          >
            <Ionicons name="alert-circle" size={24} color={theme.white} />
            <Text style={[styles.newPostButtonText, { color: theme.white }]}>Add Complaint</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={[styles.postsContainer, { backgroundColor: theme.background }] }>
          {feedbackPosts.map(renderPost)}
        </ScrollView>

        <Modal
          visible={showNewPostModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowNewPostModal(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => {
                Keyboard.dismiss();
                setShowNewPostModal(false);
              }}
            >
              <View style={[styles.modalContent, { backgroundColor: theme.card }] }>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: theme.text }]}>
                    {postType === 'Feedback' ? 'Add Feedback' : 'Add Complaint'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowNewPostModal(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color={theme.text} />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={[styles.postInput, { color: theme.text, backgroundColor: theme.background, borderColor: theme.border }]}
                  placeholder={postType === 'Feedback' ? 'Share your thoughts...' : 'Describe your complaint...'}
                  multiline
                  value={newPost}
                  onChangeText={setNewPost}
                  placeholderTextColor={theme.textLight}
                  autoFocus
                />

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setShowNewPostModal(false)}
                  >
                    <Text style={[styles.cancelButtonText, { color: theme.text }]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.postButton, { backgroundColor: theme.primary }]}
                    onPress={handlePost}
                  >
                    <Text style={[styles.postButtonText, { color: theme.white }]}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  newPostButtonText: {
    marginLeft: 8,
    fontWeight: '600',
  },
  postsContainer: {
    flex: 1,
    padding: 20,
  },
  postCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  postInput: {
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
  },
  postButton: {
  },
  cancelButtonText: {
    fontWeight: '600',
  },
  postButtonText: {
    fontWeight: '600',
  },
});

export default Feedback; 