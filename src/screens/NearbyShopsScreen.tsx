import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { getNearbyShops } from '../api/barbershops';
import { BarberShop } from '../types';
import LeafletMap from '../components/LeafletMap';

export default function NearbyShopsScreen({ navigation }: any) {
  const [shops, setShops] = useState<BarberShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    getLocationAndFetchShops();
  }, []);

  const getLocationAndFetchShops = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const coords = { lat: loc.coords.latitude, lng: loc.coords.longitude };
      setLocation(coords);

      // Use mock data for now to avoid timeout issues
      const mockShops: BarberShop[] = [
        {
          id: '1',
          ownerId: 'owner1',
          name: 'Classic Barber',
          description: 'Traditional barber shop with experienced barbers',
          address: '123 Main St, New York, NY',
          lat: 40.7128,
          lng: -74.0060,
          phone: '+1 555-0123',
          email: 'classic@barber.com',
          rating: 4.5,
          reviewCount: 128,
          isActive: true,
          distance: 0.5,
          image: 'https://picsum.photos/seed/barber1/200/150'
        },
        {
          id: '2',
          ownerId: 'owner2',
          name: 'Modern Cuts',
          description: 'Contemporary barber shop with modern styling',
          address: '456 Broadway, New York, NY',
          lat: 40.7589,
          lng: -73.9851,
          phone: '+1 555-0456',
          email: 'modern@barber.com',
          rating: 4.8,
          reviewCount: 89,
          isActive: true,
          distance: 1.2,
          image: 'https://picsum.photos/seed/barber2/200/150'
        },
        {
          id: '3',
          ownerId: 'owner3',
          name: 'Gentlemen\'s Choice',
          description: 'Premium barber shop with luxury services',
          address: '789 Fifth Ave, New York, NY',
          lat: 40.7614,
          lng: -73.9776,
          phone: '+1 555-0789',
          email: 'gentlemen@barber.com',
          rating: 4.9,
          reviewCount: 156,
          isActive: true,
          distance: 2.1,
          image: 'https://picsum.photos/seed/barber3/200/150'
        }
      ];

      setShops(mockShops);
      
      // Uncomment below when API is ready
      // const { data } = await getNearbyShops(coords);
      // setShops(data);
    } catch (error) {
      console.error('Error fetching shops:', error);
      Alert.alert(
        'Connection Error',
        'Unable to load nearby barbershops. Please check your internet connection.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShopPress = (shop: BarberShop) => {
    navigation.navigate('ShopDetail', { shopId: shop.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Barbershops</Text>
        <TouchableOpacity onPress={getLocationAndFetchShops}>
          <Text style={styles.refreshButton}>🔄</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Finding nearby barbershops...</Text>
        </View>
      ) : (
        <LeafletMap
          shops={shops.map(shop => ({
            id: shop.id,
            name: shop.name,
            latitude: shop.lat,
            longitude: shop.lng,
            address: shop.address,
          }))}
          userLocation={location ? {
            latitude: location.lat,
            longitude: location.lng,
          } : undefined}
          onShopPress={handleShopPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  refreshButton: { fontSize: 24, color: '#666' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 18, color: '#666', marginTop: 16 },
  });
