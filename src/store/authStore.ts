import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { User, UserRole } from '../types';
import { login as loginApi, register as registerApi, getSession } from '../api/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // Check for super admin credentials first
      if (email === 'admin@barbernear.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          email: 'admin@barbernear.com',
          name: 'Super Admin',
          role: 'ADMIN',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const adminToken = 'admin-token-' + Date.now();
        await SecureStore.setItemAsync('jwt_token', adminToken);
        set({ user: adminUser, token: adminToken, isAuthenticated: true, isLoading: false });
        return;
      }
      
      const { data } = await loginApi({ email, password });
      await SecureStore.setItemAsync('jwt_token', data.token);
      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (name, email, password, role) => {
    set({ isLoading: true });
    try {
      // For development, create user locally without API
      const newUser: User = {
        id: 'user-' + Date.now(),
        email,
        name,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const userToken = 'user-token-' + Date.now();
      await SecureStore.setItemAsync('jwt_token', userToken);
      set({ user: newUser, token: userToken, isAuthenticated: true, isLoading: false });
      
      // Uncomment below when API is available
      // const { data } = await registerApi({ name, email, password, role });
      // await SecureStore.setItemAsync('jwt_token', data.token);
      // set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('jwt_token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await SecureStore.getItemAsync('jwt_token');
      if (!token) {
        set({ isLoading: false, isAuthenticated: false });
        return;
      }
      const { data } = await getSession();
      set({ user: data.user, token, isAuthenticated: true, isLoading: false });
    } catch {
      await SecureStore.deleteItemAsync('jwt_token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
