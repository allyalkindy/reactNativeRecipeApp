import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useRouter } from 'expo-router';
import SafeScreen from '../components/SafeScreen';
import BackButton from '../components/BackButton';

const AboutUs = () => {
  const router = useRouter();

  const features = [
    {
      icon: 'restaurant-outline',
      title: 'Recipe Discovery',
      description: 'Explore thousands of delicious recipes from around the world',
    },
    {
      icon: 'heart-outline',
      title: 'Save Favorites',
      description: 'Keep your favorite recipes in one place for easy access',
    },
    {
      icon: 'search-outline',
      title: 'Smart Search',
      description: "Find exactly what you're looking for with our powerful search",
    },
    {
      icon: 'time-outline',
      title: 'Quick & Easy',
      description: 'Get cooking with simple, step-by-step instructions',
    },
  ];

  return (
    <SafeScreen>
      <BackButton />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>About Recipe App</Text>
          <Text style={styles.subtitle}>Your Personal Cooking Companion</Text>
        </View>

        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="restaurant" size={60} color={COLORS.primary} />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Welcome to Recipe App, your ultimate cooking companion! We're passionate about making cooking
            accessible, enjoyable, and delicious for everyone. Whether you're a seasoned chef or just
            starting your culinary journey, we're here to help you discover, create, and share amazing
            recipes.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons name={feature.icon} size={24} color={COLORS.primary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.startButtonText}>Start Cooking with Us</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionContainer: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
    textAlign: 'center',
  },
  featuresContainer: {
    padding: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default AboutUs; 