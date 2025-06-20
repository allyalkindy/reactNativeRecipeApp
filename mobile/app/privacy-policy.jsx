import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import SafeScreen from '../components/SafeScreen';
import BackButton from '../components/BackButton';

const PrivacyPolicy = () => {
  const { getTheme } = useSettings();
  const theme = getTheme();

  return (
    <SafeScreen>
      <BackButton />
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Privacy Policy</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>1. Introduction</Text>
          <Text style={[styles.text, { color: theme.textLight }]}>ALLY RECIPY respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our app.</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>2. Information We Collect</Text>
          <Text style={[styles.text, { color: theme.textLight }]}>- <Text style={{fontWeight:'bold'}}>Account Information:</Text> When you sign up or log in, we collect your email address and authentication data via Clerk.
- <Text style={{fontWeight:'bold'}}>Usage Data:</Text> We collect information about how you use the app, such as favorite recipes and settings.
- <Text style={{fontWeight:'bold'}}>No Sensitive Data:</Text> We do not collect sensitive personal information or payment data.</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>3. How We Use Your Information</Text>
          <Text style={[styles.text, { color: theme.textLight }]}>- To provide and improve the app experience
- To personalize your experience (e.g., favorites, dark mode)
- To communicate important updates (if you opt in)</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>4. Data Sharing</Text>
          <Text style={[styles.text, { color: theme.textLight }]}>- We do <Text style={{fontWeight:'bold'}}>not</Text> sell or share your personal data with third parties for advertising.
- We may share data with service providers (e.g., Clerk for authentication, database hosting) only as needed to operate the app.</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>5. Data Security</Text>
          <Text style={[styles.text, { color: theme.textLight }]}>We use secure technologies and best practices to protect your data. However, no system is 100% secure.</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>6. Your Choices</Text>
          <Text style={[styles.text, { color: theme.textLight }]}>- You can update or delete your account at any time.
- You can contact us for any privacy questions or requests.</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>7. Changes to This Policy</Text>
          <Text style={[styles.text, { color: theme.textLight }]}>We may update this policy. We will notify you of any significant changes.</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>8. Contact</Text>
          <Text style={[styles.text, { color: theme.textLight }]}>If you have questions about this policy, contact us at allymohammedsaid126@gmail.com.</Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default PrivacyPolicy; 