import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarberShop } from '../types';

interface ShopCardProps {
  shop: BarberShop;
  onPress: () => void;
}

export default function ShopCard({ shop, onPress }: ShopCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {shop.image && (
        <Image source={{ uri: shop.image }} style={styles.image} />
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.shopName}>{shop.name}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>★</Text>
            <Text style={styles.ratingValue}>{shop.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        <Text style={styles.address} numberOfLines={2}>
          📍 {shop.address}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.reviews}>
            {shop.reviewCount} reviews
          </Text>
          {shop.distance && (
            <Text style={styles.distance}>
              🚶 {shop.distance.toFixed(1)} km away
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  shopName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingValue: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  address: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviews: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  distance: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '600',
  },
});
