import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '../../context/SettingsContext';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useState } from 'react';
import SideMenu from '../../components/SideMenu';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { getTheme } = useSettings();
  const { isSignedIn, isLoaded } = useAuth();
  const theme = getTheme();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  if (!isLoaded) return null;

  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>App Recipe</Text>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsMenuVisible(true)}
          >
            <Ionicons name="menu" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textLight,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <SideMenu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 5,
  },
});
