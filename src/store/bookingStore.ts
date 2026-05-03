import { create } from 'zustand';
import { Booking } from '../types';
import { getMyBookings, createBooking as createBookingApi, cancelBooking as cancelBookingApi } from '../api/bookings';

interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  fetchBookings: () => Promise<void>;
  createBooking: (shopId: string, serviceId: string, date: string, barberId?: string, notes?: string) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  isLoading: false,

  fetchBookings: async () => {
    set({ isLoading: true });
    try {
      const { data } = await getMyBookings();
      set({ bookings: data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  createBooking: async (shopId, serviceId, date, barberId, notes) => {
    set({ isLoading: true });
    try {
      const { data } = await createBookingApi({ shopId, serviceId, date, barberId, notes });
      set({ bookings: [...get().bookings, data], isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error('Failed to create booking');
    }
  },

  cancelBooking: async (id) => {
    try {
      await cancelBookingApi(id);
      set({
        bookings: get().bookings.map((b) =>
          b.id === id ? { ...b, status: 'CANCELLED' as const } : b
        ),
      });
    } catch {
      throw new Error('Failed to cancel booking');
    }
  },
}));
