import api from './client';
import { Booking, CreateBookingData } from '../types';

export const getMyBookings = () =>
  api.get<Booking[]>('/api/bookings');

export const createBooking = (data: CreateBookingData) =>
  api.post<Booking>('/api/bookings', data);

export const cancelBooking = (id: string) =>
  api.patch<Booking>(`/api/bookings/${id}`, { status: 'CANCELLED' });
