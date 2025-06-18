import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import SafeScreen from '../components/SafeScreen';
import BackButton from '../components/BackButton';
import { useSettings } from '../context/SettingsContext';
import { useRouter } from 'expo-router';

const HelpCenter = () => {
  const { getTheme } = useSettings();
  const router = useRouter();
  const theme = getTheme();

  const faqs = [
    {
      question: 'How do I create a recipe?',
      answer: 'To create a recipe, go to the Home screen and tap the "+" button. Fill in the recipe details, ingredients, and instructions, then tap "Save".',
    },
    {
      question: 'How do I edit my profile?',
      answer: 'Go to Settings > Account > Edit Profile. Here you can update your personal information and profile picture.',
    },
    {
      question: 'How do I change my password?',
      answer: 'Go to Settings > Account > Change Password. Enter your current password and your new password twice to confirm.',
    },
    {
      question: 'How do I report a problem?',
      answer: 'You can report problems by going to Settings > Feedback & Complaints. Select "Complaint" and describe the issue you\'re experiencing.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact our support team through Settings > Contact Us. We\'re available 24/7 via email and WhatsApp.',
    },
  ];

  const renderFAQ = (faq, index) => (
    <View key={index} style={[styles.faqItem, { backgroundColor: theme.card }]}>
      <Text style={[styles.question, { color: theme.text }]}>{faq.question}</Text>
      <Text style={[styles.answer, { color: theme.textLight }]}>{faq.answer}</Text>
    </View>
  );

  return (
    <SafeScreen>
      <BackButton />
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Help Center</Text>
          <Text style={[styles.subtitle, { color: theme.textLight }]}>
            Find answers to common questions and get support
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Frequently Asked Questions</Text>
          {faqs.map(renderFAQ)}
        </View>

        <View style={[styles.contactSection, { backgroundColor: theme.card }]}>
          <Text style={[styles.contactTitle, { color: theme.text }]}>Need More Help?</Text>
          <Text style={[styles.contactText, { color: theme.textLight }]}>
            Our support team is available 24/7 to assist you with any questions or issues you may have.
          </Text>
          <TouchableOpacity
            style={[styles.contactButton, { backgroundColor: theme.primary }]}
            onPress={() => router.push('/contact')}
          >
            <Ionicons name="mail-outline" size={20} color={COLORS.white} />
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  faqItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactSection: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HelpCenter; 