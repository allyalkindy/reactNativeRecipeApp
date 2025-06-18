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
import { COLORS } from '../constants/colors';
import SafeScreen from '../components/SafeScreen';
import BackButton from '../components/BackButton';

const STORAGE_KEY = '@feedback_posts';

const Feedback = () => {
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [feedbackPosts, setFeedbackPosts] = useState([]);

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
          type: 'Feedback',
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
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={40} color={COLORS.primary} />
          </View>
          <View>
            <Text style={styles.userName}>{post.user}</Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
        </View>
        <View style={[
          styles.typeBadge,
          { backgroundColor: post.type === 'Feedback' ? COLORS.success : COLORS.error }
        ]}>
          <Text style={styles.typeText}>{post.type}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>
    </View>
  );

  return (
    <SafeScreen>
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Feedback & Complaints</Text>
        </View>

        <TouchableOpacity
          style={styles.newPostButton}
          onPress={() => setShowNewPostModal(true)}
        >
          <Ionicons name="add-circle" size={24} color={COLORS.white} />
          <Text style={styles.newPostButtonText}>Add Feedback</Text>
        </TouchableOpacity>

        <ScrollView style={styles.postsContainer}>
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
            style={styles.modalContainer}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => {
                Keyboard.dismiss();
                setShowNewPostModal(false);
              }}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add Feedback</Text>
                  <TouchableOpacity
                    onPress={() => setShowNewPostModal(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color={COLORS.text} />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.postInput}
                  placeholder="Share your thoughts..."
                  multiline
                  value={newPost}
                  onChangeText={setNewPost}
                  placeholderTextColor={COLORS.textLight}
                  autoFocus
                />

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setShowNewPostModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.postButton]}
                    onPress={handlePost}
                  >
                    <Text style={styles.postButtonText}>Submit</Text>
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
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  newPostButtonText: {
    color: COLORS.white,
    marginLeft: 8,
    fontWeight: '600',
  },
  postsContainer: {
    flex: 1,
    padding: 20,
  },
  postCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
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
    color: COLORS.text,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  postContent: {
    fontSize: 16,
    color: COLORS.text,
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
    backgroundColor: COLORS.white,
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
    color: COLORS.text,
  },
  closeButton: {
    padding: 4,
  },
  postInput: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    color: COLORS.text,
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
    backgroundColor: COLORS.background,
  },
  postButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButtonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  postButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default Feedback; 