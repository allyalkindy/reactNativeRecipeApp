import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useSettings } from '../../context/SettingsContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const USER_NAME_KEY = '@user_full_name';

export default function Profile() {
  const { getTheme } = useSettings();
  const theme = getTheme();
  const { user } = useUser();
  const { signOut } = useAuth();
  const [fullName, setFullName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    loadUserName();
  }, []);

  const loadUserName = async () => {
    try {
      const savedName = await AsyncStorage.getItem(USER_NAME_KEY);
      if (savedName) {
        setFullName(savedName);
      } else if (user?.fullName) {
        setFullName(user.fullName);
        await AsyncStorage.setItem(USER_NAME_KEY, user.fullName);
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    }
  };

  const handleSaveName = async () => {
    if (!tempName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    try {
      await AsyncStorage.setItem(USER_NAME_KEY, tempName.trim());
      setFullName(tempName.trim());
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving name:', error);
      Alert.alert('Error', 'Failed to save name');
    }
  };

  const handleLogout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem(USER_NAME_KEY);
      
      // Sign out from Clerk
      await signOut();
      
      // Force navigation to sign-in screen
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={[styles.avatarContainer, { backgroundColor: theme.card }]}>
          <Ionicons name="person" size={60} color={theme.text} />
        </View>

        <View style={styles.infoContainer}>
          {isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={[styles.input, { 
                  color: theme.text,
                  backgroundColor: theme.card,
                  borderColor: theme.border
                }]}
                value={tempName}
                onChangeText={setTempName}
                placeholder="Enter your name"
                placeholderTextColor={theme.textLight}
                autoFocus
              />
              <View style={styles.editButtons}>
                <TouchableOpacity
                  style={[styles.editButton, { backgroundColor: theme.primary }]}
                  onPress={handleSaveName}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.editButton, { backgroundColor: theme.border }]}
                  onPress={() => {
                    setIsEditing(false);
                    setTempName(fullName);
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.nameContainer}>
              <Text style={[styles.name, { color: theme.text }]}>
                {fullName || 'Add your name'}
              </Text>
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => {
                  setTempName(fullName);
                  setIsEditing(true);
                }}
              >
                <Ionicons name="pencil" size={20} color={theme.primary} />
              </TouchableOpacity>
            </View>
          )}

          <Text style={[styles.email, { color: theme.textLight }]}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.card }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  editIcon: {
    padding: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  editContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    margin: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 