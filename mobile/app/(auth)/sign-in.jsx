import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Image } from "expo-image";

import { authStyles } from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";

const SignInScreen = () => {
  const router = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: code+new password
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [forgotError, setForgotError] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        Alert.alert("Error", "Sign in failed. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      Alert.alert("Error", err.errors?.[0]?.message || "Sign in failed");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Send reset code to email
  const handleForgotPasswordSendCode = async () => {
    setForgotError("");
    setForgotSuccess("");
    if (!forgotEmail) {
      setForgotError("Please enter your email address.");
      return;
    }
    setForgotLoading(true);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: forgotEmail,
      });
      setForgotStep(2);
    } catch (err) {
      setForgotError(err.errors?.[0]?.message || "Failed to send reset code");
      console.log("Forgot password error (send code):", err);
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 2: Submit code and new password
  const handleForgotPasswordReset = async () => {
    setForgotError("");
    setForgotSuccess("");
    if (!forgotCode || !forgotNewPassword) {
      setForgotError("Please enter the code and your new password.");
      return;
    }
    setForgotLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: forgotCode,
        password: forgotNewPassword,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setForgotSuccess("Password reset! You are now signed in.");
        setForgotStep(1);
        setShowForgotModal(false);
        setForgotEmail("");
        setForgotCode("");
        setForgotNewPassword("");
      } else {
        setForgotError("Unexpected status: " + result.status);
      }
    } catch (err) {
      setForgotError(err.errors?.[0]?.message || "Failed to reset password");
      console.log("Forgot password error (reset):", err);
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i1.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Welcome Back</Text>

          {/* FORM CONTAINER */}
          <View style={authStyles.formContainer}>
            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* PASSWORD INPUT */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => {
                setShowForgotModal(true);
                setForgotStep(1);
                setForgotEmail("");
                setForgotCode("");
                setForgotNewPassword("");
                setForgotError("");
                setForgotSuccess("");
              }}
            >
              <Text style={[authStyles.linkText, { color: COLORS.primary, textAlign: "right", width: "100%" }]}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text style={authStyles.linkText}>
                Don&apos;t have an account? <Text style={authStyles.link}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Forgot Password Modal */}
      <Modal
        visible={showForgotModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowForgotModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: COLORS.background, borderRadius: 16, padding: 24, width: '85%' }}>
            <Text style={[authStyles.title, { fontSize: 22, marginBottom: 12 }]}>Reset Password</Text>
            {forgotStep === 1 && (
              <>
                <Text style={[authStyles.subtitle, { marginBottom: 16 }]}>Enter your email address and we'll send you a password reset code.</Text>
                <TextInput
                  style={[authStyles.textInput, { marginBottom: 12 }]}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.textLight}
                  value={forgotEmail}
                  onChangeText={setForgotEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {forgotError ? <Text style={{ color: COLORS.error, marginBottom: 8 }}>{forgotError}</Text> : null}
                {forgotSuccess ? <Text style={{ color: COLORS.primary, marginBottom: 8 }}>{forgotSuccess}</Text> : null}
                <TouchableOpacity
                  style={[authStyles.authButton, forgotLoading && authStyles.buttonDisabled]}
                  onPress={handleForgotPasswordSendCode}
                  disabled={forgotLoading}
                  activeOpacity={0.8}
                >
                  <Text style={authStyles.buttonText}>{forgotLoading ? "Sending..." : "Send Reset Code"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={authStyles.linkContainer}
                  onPress={() => setShowForgotModal(false)}
                >
                  <Text style={authStyles.linkText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
            {forgotStep === 2 && (
              <>
                <Text style={[authStyles.subtitle, { marginBottom: 16 }]}>Enter the code sent to your email and your new password.</Text>
                <TextInput
                  style={[authStyles.textInput, { marginBottom: 12 }]}
                  placeholder="Reset code"
                  placeholderTextColor={COLORS.textLight}
                  value={forgotCode}
                  onChangeText={setForgotCode}
                  autoCapitalize="none"
                />
                <TextInput
                  style={[authStyles.textInput, { marginBottom: 12 }]}
                  placeholder="New password"
                  placeholderTextColor={COLORS.textLight}
                  value={forgotNewPassword}
                  onChangeText={setForgotNewPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
                {forgotError ? <Text style={{ color: COLORS.error, marginBottom: 8 }}>{forgotError}</Text> : null}
                {forgotSuccess ? <Text style={{ color: COLORS.primary, marginBottom: 8 }}>{forgotSuccess}</Text> : null}
                <TouchableOpacity
                  style={[authStyles.authButton, forgotLoading && authStyles.buttonDisabled]}
                  onPress={handleForgotPasswordReset}
                  disabled={forgotLoading}
                  activeOpacity={0.8}
                >
                  <Text style={authStyles.buttonText}>{forgotLoading ? "Resetting..." : "Reset Password"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={authStyles.linkContainer}
                  onPress={() => {
                    setForgotStep(1);
                    setForgotCode("");
                    setForgotNewPassword("");
                    setForgotError("");
                    setForgotSuccess("");
                  }}
                >
                  <Text style={authStyles.linkText}>Back</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SignInScreen;
