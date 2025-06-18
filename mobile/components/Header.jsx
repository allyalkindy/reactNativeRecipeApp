import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SideMenu from './SideMenu';

const Header = ({ title }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setIsMenuVisible(true)}
      >
        <Ionicons name="menu" size={24} color="#333" />
      </TouchableOpacity>
      
      <SideMenu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuButton: {
    padding: 5,
  },
});

export default Header; 