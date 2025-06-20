import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '../context/SettingsContext';
import SafeScreen from '../components/SafeScreen';
import BackButton from '../components/BackButton';

const Contact = () => {
  const email = 'allymohammedsaid126@gmail.com';
  const whatsapp = '+255776885581';
  const { getTheme } = useSettings();
  const theme = getTheme();

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWhatsAppPress = () => {
    const whatsappUrl = `whatsapp://send?phone=${whatsapp}`;
    const webUrl = `https://wa.me/${whatsapp}`;

    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          return Linking.openURL(webUrl);
        }
      })
      .catch((err) => console.error('Error opening WhatsApp:', err));
  };

  return (
    <SafeScreen>
      <BackButton />
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Contact Us</Text>
          <Text style={[styles.subtitle, { color: theme.textLight }]}>We'd love to hear from you</Text>
        </View>

        <View style={styles.iconContainer}>
          <View style={[styles.iconBackground, { backgroundColor: theme.card, shadowColor: theme.shadow }]}>
            <Ionicons name="mail" size={60} color={theme.primary} />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={[styles.description, { color: theme.text }]}>
            Have questions, feedback, or need assistance? We're here to help! Choose your preferred way to reach us below.
          </Text>
        </View>

        <View style={styles.contactOptionsContainer}>
          {/* Email Option */}
          <TouchableOpacity style={[styles.contactOption, { backgroundColor: theme.card, shadowColor: theme.shadow }]} onPress={handleEmailPress}>
            <View style={[styles.contactIconContainer, { backgroundColor: theme.background }]}>
              <Ionicons name="mail-outline" size={32} color={theme.primary} />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={[styles.contactTitle, { color: theme.text }]}>Email Us</Text>
              <Text style={[styles.contactDetail, { color: theme.textLight }]}>{email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.textLight} />
          </TouchableOpacity>

          {/* WhatsApp Option */}
          <TouchableOpacity style={[styles.contactOption, { backgroundColor: theme.card, shadowColor: theme.shadow }]} onPress={handleWhatsAppPress}>
            <View style={[styles.contactIconContainer, { backgroundColor: theme.background }]}>
              <Ionicons name="logo-whatsapp" size={32} color={theme.primary} />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={[styles.contactTitle, { color: theme.text }]}>WhatsApp</Text>
              <Text style={[styles.contactDetail, { color: theme.textLight }]}>{whatsapp}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={[styles.infoItem, { backgroundColor: theme.card, shadowColor: theme.shadow }]}>
            <Ionicons name="time-outline" size={24} color={theme.primary} />
            <Text style={[styles.infoText, { color: theme.text }]}>24/7 Support</Text>
          </View>
          <View style={[styles.infoItem, { backgroundColor: theme.card, shadowColor: theme.shadow }]}>
            <Ionicons name="chatbubble-outline" size={24} color={theme.primary} />
            <Text style={[styles.infoText, { color: theme.text }]}>Quick Response</Text>
          </View>
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
  subtitle: {
    fontSize: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  contactOptionsContainer: {
    padding: 20,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 10,
  },
  infoItem: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    width: '45%',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Contact; 