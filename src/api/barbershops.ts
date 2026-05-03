import api from './client';
import { BarberShop, LocationCoords } from '../types';

export const getNearbyShops = (coords: LocationCoords, radius?: number) =>
  api.get<BarberShop[]>('/api/barbershops/nearby', {
    params: { lat: coords.lat, lng: coords.lng, radius },
  });

export const getShopById = (id: string) =>
  api.get<BarberShop>(`/api/barbershops/${id}`);
