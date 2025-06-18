import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import SafeScreen from '../components/SafeScreen';
import BackButton from '../components/BackButton';

const Contact = () => {
  const email = 'allymohammedsaid126@gmail.com';
  const whatsapp = '+255776885581';

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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>We'd love to hear from you</Text>
        </View>

        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="mail" size={60} color={COLORS.primary} />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Have questions, feedback, or need assistance? We're here to help! Choose your preferred way to reach us below.
          </Text>
        </View>

        <View style={styles.contactOptionsContainer}>
          {/* Email Option */}
          <TouchableOpacity style={styles.contactOption} onPress={handleEmailPress}>
            <View style={styles.contactIconContainer}>
              <Ionicons name="mail-outline" size={32} color={COLORS.primary} />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactTitle}>Email Us</Text>
              <Text style={styles.contactDetail}>{email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
          </TouchableOpacity>

          {/* WhatsApp Option */}
          <TouchableOpacity style={styles.contactOption} onPress={handleWhatsAppPress}>
            <View style={styles.contactIconContainer}>
              <Ionicons name="logo-whatsapp" size={32} color={COLORS.primary} />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactTitle}>WhatsApp</Text>
              <Text style={styles.contactDetail}>{whatsapp}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={24} color={COLORS.primary} />
            <Text style={styles.infoText}>24/7 Support</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="chatbubble-outline" size={24} color={COLORS.primary} />
            <Text style={styles.infoText}>Quick Response</Text>
          </View>
        </View>
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
  contactOptionsContainer: {
    padding: 20,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
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
    color: COLORS.text,
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 10,
  },
  infoItem: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    width: '45%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default Contact; 