import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import { getNearbyShops } from '../api/barbershops';
import { BarberShop } from '../types';

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

      const { data } = await getNearbyShops(coords);
      setShops(data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderShop = ({ item }: { item: BarberShop }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ShopDetail', { shopId: item.id })}
    >
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={styles.cardContent}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <View style={styles.details}>
          <Text style={styles.rating}>★ {item.rating.toFixed(1)}</Text>
          <Text style={styles.distance}>{item.distance?.toFixed(1)} km away</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Barbershops</Text>
      <FlatList
        data={shops}
        renderItem={renderShop}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshing={Boolean(loading)}
        onRefresh={getLocationAndFetchShops}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { paddingBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', elevation: 3 },
  image: { width: '100%', height: 150 },
  cardContent: { padding: 12 },
  shopName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  address: { color: '#666', marginBottom: 8 },
  details: { flexDirection: 'row', justifyContent: 'space-between' },
  rating: { color: '#FFB800', fontWeight: 'bold' },
  distance: { color: '#999' },
});
