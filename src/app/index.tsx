import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router, Stack } from "expo-router";

type TabType = "email" | "phone";

type FormData = {
  email?: string;
  phone?: string;
  password: string;
};

const LoginScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>("email");
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormData>();

  const handleTabSwitch = (tab: TabType) => {
    setActiveTab(tab);
    resetField("email");
    resetField("phone");
  };

  const onSubmit = (data: FormData) => {
    const VALID_EMAIL = "example@gmail.com";
    const VALID_PHONE = "01234567890";
    const VALID_PASSWORD = "12345678";

    const emailMatch =
      data.email === VALID_EMAIL && data.password === VALID_PASSWORD;
    const phoneMatch =
      data.phone === VALID_PHONE && data.password === VALID_PASSWORD;

    if (emailMatch || phoneMatch) {
      router.push("/dashboard");
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAF8" />
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header / Logo */}
          <View style={styles.header}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>A</Text>
            </View>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          {/* Tab Toggle */}
          <View style={styles.tabRow}>
            <Pressable
              style={[
                styles.tabBtn,
                activeTab === "email" && styles.tabBtnActive,
              ]}
              onPress={() => handleTabSwitch("email")}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  activeTab === "email" && styles.tabBtnTextActive,
                ]}
              >
                Email
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabBtn,
                activeTab === "phone" && styles.tabBtnActive,
              ]}
              onPress={() => handleTabSwitch("phone")}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  activeTab === "phone" && styles.tabBtnTextActive,
                ]}
              >
                Phone
              </Text>
            </Pressable>
          </View>

          {/* Email / Phone Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              {activeTab === "email" ? "Email Address" : "Phone Number"}
            </Text>

            <Controller
              control={control}
              name={activeTab === "email" ? "email" : "phone"}
              rules={{
                required: `${activeTab === "email" ? "Email" : "Phone number"} is required`,
                pattern:
                  activeTab === "email"
                    ? {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      }
                    : { value: /^[0-9]+$/, message: "Only numbers allowed" },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    (errors.email || errors.phone) && styles.inputError,
                  ]}
                  placeholder={
                    activeTab === "email" ? "you@example.com" : "01234567890"
                  }
                  placeholderTextColor="#AEAEB2"
                  keyboardType={
                    activeTab === "email" ? "email-address" : "numeric"
                  }
                  autoCapitalize="none"
                  value={value ?? ""}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone.message}</Text>
            )}
          </View>

          {/* Password Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>

            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.passwordWrap}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      errors.password && styles.inputError,
                    ]}
                    placeholder="Enter your password"
                    placeholderTextColor="#AEAEB2"
                    secureTextEntry={!showPassword}
                    value={value ?? ""}
                    onChangeText={onChange}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeBtn}
                    onPress={() => setShowPassword((prev) => !prev)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.eyeIcon}>
                      {showPassword ? "🙈" : "👁️"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotWrap} activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.85}
          >
            <Text style={styles.loginBtnText}>Sign In</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
              <Text style={styles.socialBtnText}>G Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
              <Text style={styles.socialBtnText}> GitHub</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 48,
  },

  // Header
  header: {
    alignItems: "center",
    marginTop: 48,
    marginBottom: 36,
  },
  logoBox: {
    width: 64,
    height: 64,
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1C1C1E",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#8A8A8E",
    marginTop: 6,
  },

  // Tab Toggle
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#EBEBEC",
    borderRadius: 12,
    padding: 4,
    marginBottom: 28,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: "center",
  },
  tabBtnActive: {
    backgroundColor: "#1C1C1E",
  },
  tabBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8A8A8E",
  },
  tabBtnTextActive: {
    color: "#fff",
  },

  // Fields
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6E6E73",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#DDDDD8",
    borderRadius: 13,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1C1C1E",
  },
  inputError: {
    borderColor: "#E24B4A",
  },
  errorText: {
    fontSize: 12,
    color: "#E24B4A",
    marginTop: 6,
  },

  // Password
  passwordWrap: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIcon: {
    fontSize: 18,
  },

  // Forgot
  forgotWrap: {
    alignItems: "flex-end",
    marginBottom: 28,
    marginTop: -8,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1C1E",
  },

  // Login Button
  loginBtn: {
    backgroundColor: "#1C1C1E",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  // Divider
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDDDD8",
  },
  dividerText: {
    fontSize: 12,
    color: "#8A8A8E",
  },

  // Social
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  socialBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#DDDDD8",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  socialBtnText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1C1C1E",
  },

  // Sign Up
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 13,
    color: "#8A8A8E",
  },
  signupLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1C1C1E",
  },
});

export default LoginScreen;
