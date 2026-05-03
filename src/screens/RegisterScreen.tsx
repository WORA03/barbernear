import React from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, ScrollView } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '../types';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import GradientBackground from '../components/GradientBackground';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<UserRole>('CUSTOMER');
  const { register, isLoading } = useAuthStore();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      await register(name, email, password, role);
    } catch (error: any) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <GradientBackground variant="classic">
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>BarberNear</Text>
            <Text style={styles.subtitle}>Create your account</Text>

            <CustomInput
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />

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
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Select Role:</Text>
              <View style={styles.roleButtons}>
                {(['Customer', 'BARBER_OWNER'] as UserRole[]).map((r) => (
                  <CustomButton
                    key={r}
                    title={r === 'BARBER_OWNER' ? 'Barber' : r}
                    onPress={() => setRole(r)}
                    variant={role === r ? 'primary' : 'outline'}
                    size="small"
                    style={styles.roleButton}
                  />
                ))}
              </View>
            </View>

            <CustomButton
              title={isLoading ? 'Creating Account...' : 'Create Account'}
              onPress={handleRegister}
              disabled={isLoading}
              loading={isLoading}
              style={styles.registerButton}
            />

            <CustomButton
              title="Back to Login"
              onPress={() => navigation.navigate('Login')}
              variant="outline"
              style={styles.loginButton}
            />
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    minHeight: height,
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
    roleContainer: {
    marginBottom: 24,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  roleButtons: { 
    flexDirection: 'row', 
    gap: 8, 
    flexWrap: 'wrap',
  },
  roleButton: {
    flex: 1,
    minWidth: 120,
  },
  registerButton: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
  },
});
