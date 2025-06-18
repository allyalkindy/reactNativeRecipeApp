import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSettings } from '../context/SettingsContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const SideMenu = ({ visible, onClose }) => {
  const router = useRouter();
  const { getTheme } = useSettings();
  const theme = getTheme();

  const menuItems = [
    { icon: 'home-outline', label: 'Home', onPress: () => handleMenuItemPress('home') },
    { icon: 'person-outline', label: 'Profile', onPress: () => handleMenuItemPress('profile') },
    { icon: 'settings-outline', label: 'Settings', onPress: () => handleMenuItemPress('settings') },
    { icon: 'information-circle-outline', label: 'About', onPress: () => handleMenuItemPress('about') },
    { icon: 'mail-outline', label: 'Contact', onPress: () => handleMenuItemPress('contact') },
    { icon: 'chatbubble-outline', label: 'Feedback & Complaints', onPress: () => handleMenuItemPress('feedback') },
  ];

  const handleMenuItemPress = (screen) => {
    onClose();
    switch (screen) {
      case 'home':
        router.push('/');
        break;
      case 'profile':
        router.push('/profile');
        break;
      case 'settings':
        router.push('/settings');
        break;
      case 'about':
        router.push('/about');
        break;
      case 'contact':
        router.push('/contact');
        break;
      case 'feedback':
        router.push('/feedback');
        break;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={onClose}
        />
        <View style={[styles.menuContainer, { backgroundColor: theme.card }]}>
          <SafeAreaView style={styles.safeArea} edges={['top', 'right']}>
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Menu</Text>
              <TouchableOpacity 
                onPress={onClose}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.menuItems}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.menuItem, { borderBottomColor: theme.border }]}
                  onPress={item.onPress}
                >
                  <Ionicons name={item.icon} size={24} color={theme.text} />
                  <Text style={[styles.menuItemText, { color: theme.text }]}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={20} color={theme.textLight} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: '80%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    margin: -10,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
});

export default SideMenu; 