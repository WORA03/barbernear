import api from './client';
import { RegisterData, LoginData, User } from '../types';

export const login = (data: LoginData) =>
  api.post<{ user: User; token: string }>('/api/auth/callback/credentials', data);

export const register = (data: RegisterData) =>
  api.post<{ user: User; token: string }>('/api/register', data);

export const getSession = () =>
  api.get<{ user: User }>('/api/auth/session');

export const logout = async () => {
  await api.post('/api/auth/logout');
};
