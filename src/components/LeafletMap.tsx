import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

interface LeafletMapProps {
  shops?: Array<{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address?: string;
  }>;
  userLocation?: {
    latitude: number;
    longitude: number;
  };
  onShopPress?: (shop: any) => void;
}

export default function LeafletMap({ 
  shops = [], 
  userLocation, 
  onShopPress 
}: LeafletMapProps) {
  const renderShopList = () => {
    return shops.map((shop) => (
      <TouchableOpacity
        key={shop.id}
        style={styles.shopCard}
        onPress={() => onShopPress && onShopPress(shop)}
      >
        <View style={styles.shopHeader}>
          <View style={styles.shopIcon}>
            <Text style={styles.shopIconText}>✂️</Text>
          </View>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>{shop.name}</Text>
            {shop.address && <Text style={styles.shopAddress}>{shop.address}</Text>}
          </View>
        </View>
        <View style={styles.shopFooter}>
          <Text style={styles.shopDistance}>
            {userLocation ? '📍 Nearby' : '📍 Location unknown'}
          </Text>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => onShopPress && onShopPress(shop)}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapTitle}>🗺️ Map View</Text>
        <Text style={styles.mapSubtitle}>
          {shops.length} barbershops found nearby
        </Text>
        <View style={styles.mapImage}>
          <Text style={styles.mapImageText}>📍 Interactive Map</Text>
        </View>
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={() => Alert.alert('Map', 'Interactive map feature coming soon!')}
        >
          <Text style={styles.mapButtonText}>🗺️ Open Map</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.shopList}>
        <Text style={styles.listTitle}>Nearby Barbershops</Text>
        {renderShopList()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  mapSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  mapImage: {
    width: 120,
    height: 120,
    backgroundColor: '#D1D5DB',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  mapImageText: {
    fontSize: 32,
  },
  mapButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  shopList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  shopCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shopIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  shopIconText: {
    fontSize: 20,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  shopAddress: {
    fontSize: 14,
    color: '#6B7280',
  },
  shopFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopDistance: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});

