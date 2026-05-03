import React from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { useAuthStore } from '../store/authStore';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import GradientBackground from '../components/GradientBackground';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <GradientBackground variant="vintage">
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>BarberNear</Text>
          <Text style={styles.subtitle}>Welcome back! Login to continue</Text>

          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <CustomButton
            title={isLoading ? 'Logging in...' : 'Login'}
            onPress={handleLogin}
            disabled={isLoading}
            loading={isLoading}
            style={styles.loginButton}
          />

          <View style={styles.adminContainer}>
            <Text style={styles.adminHint}>
              Admin Access: admin@barbernear.com / admin123
            </Text>
          </View>

          <CustomButton
            title="Create Account"
            onPress={() => navigation.navigate('Register')}
            variant="outline"
            style={styles.registerButton}
          />
        </View>
      </View>
    </GradientBackground>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  title: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 32, 
    color: '#6B7280',
  },
  loginButton: {
    marginBottom: 16,
  },
  adminContainer: {
    marginVertical: 16,
  },
  adminHint: { 
    fontSize: 12, 
    textAlign: 'center', 
    color: '#9CA3AF', 
    fontStyle: 'italic',
  },
  registerButton: {
    marginTop: 8,
  },
});
