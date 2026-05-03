export type UserRole = 'CUSTOMER' | 'BARBER_OWNER' | 'ADMIN';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BarberShop {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  image?: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  distance?: number;
  services?: Service[];
}

export interface Service {
  id: string;
  shopId: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  isActive: boolean;
}

export interface Barber {
  id: string;
  shopId: string;
  name: string;
  image?: string;
  rating?: number;
}

export interface Booking {
  id: string;
  customerId: string;
  shopId: string;
  barberId?: string;
  serviceId: string;
  date: string;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  shop?: BarberShop;
  service?: Service;
  barber?: Barber;
  payment?: Payment;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED';
  stripeId?: string;
}

export interface Review {
  id: string;
  userId: string;
  shopId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateBookingData {
  shopId: string;
  barberId?: string;
  serviceId: string;
  date: string;
  notes?: string;
}

export interface LocationCoords {
  lat: number;
  lng: number;
}
