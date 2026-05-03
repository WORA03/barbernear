import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator, Image, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getShopById } from '../api/barbershops';
import { BarberShop } from '../types';

type ShopDetailRouteProp = RouteProp<{ params: { shopId: string } }, 'params'>;

export default function ShopDetailScreen({ navigation }: any) {
  const route = useRoute<ShopDetailRouteProp>();
  const { shopId } = route.params;
  const [shop, setShop] = useState<BarberShop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShop();
  }, [shopId]);

  const fetchShop = async () => {
    try {
      const { data } = await getShopById(shopId);
      setShop(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load shop details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!shop) {
    return (
      <View style={styles.container}>
        <Text>Shop not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {shop.image && <Image source={{ uri: shop.image }} style={styles.image} />}

      <View style={styles.content}>
        <Text style={styles.name}>{shop.name}</Text>
        <Text style={styles.rating}>★ {shop.rating.toFixed(1)} ({shop.reviewCount} reviews)</Text>
        <Text style={styles.address}>{shop.address}</Text>
        {shop.phone && <Text style={styles.info}>Phone: {shop.phone}</Text>}
        {shop.email && <Text style={styles.info}>Email: {shop.email}</Text>}
        {shop.description && <Text style={styles.description}>{shop.description}</Text>}

        <Text style={styles.sectionTitle}>Services</Text>
        {shop.services?.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View>
              <Text style={styles.serviceName}>{service.name}</Text>
              {service.description && <Text style={styles.serviceDesc}>{service.description}</Text>}
            </View>
            <View>
              <Text style={styles.price}>${service.price}</Text>
              <Text style={styles.duration}>{service.duration} min</Text>
            </View>
          </View>
        ))}

        <Button
          title="Book Appointment"
          onPress={() => navigation.navigate('Booking', { shopId: shop.id })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 200 },
  content: { padding: 16 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  rating: { fontSize: 16, color: '#FFB800', marginBottom: 8 },
  address: { fontSize: 14, color: '#666', marginBottom: 4 },
  info: { fontSize: 14, color: '#666', marginBottom: 4 },
  description: { fontSize: 14, color: '#333', marginTop: 12, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 12 },
  serviceCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 8 },
  serviceName: { fontSize: 16, fontWeight: 'bold' },
  serviceDesc: { fontSize: 12, color: '#666', marginTop: 4 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
  duration: { fontSize: 12, color: '#999', textAlign: 'right' },
});
