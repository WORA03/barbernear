import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Booking } from '../types';

interface BookingCardProps {
  booking: Booking;
  onPress?: () => void;
  showActions?: boolean;
  onCancel?: (id: string) => void;
}

export default function BookingCard({ 
  booking, 
  onPress, 
  showActions = false, 
  onCancel 
}: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return '#F59E0B';
      case 'CONFIRMED': return '#10B981';
      case 'COMPLETED': return '#6B7280';
      case 'CANCELLED': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'PENDING': return '#FEF3C7';
      case 'CONFIRMED': return '#D1FAE5';
      case 'COMPLETED': return '#F3F4F6';
      case 'CANCELLED': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <Text style={styles.shopName}>{booking.shop?.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBg(booking.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {booking.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{booking.service?.name}</Text>
          <Text style={styles.price}>${booking.service?.price}</Text>
        </View>
        
        <View style={styles.details}>
          <Text style={styles.date}>
            {new Date(booking.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
      </View>

      {showActions && booking.status === 'PENDING' && onCancel && (
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => onCancel(booking.id)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shopName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    gap: 8,
  },
  serviceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    color: '#374151',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
  },
  actions: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  cancelButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cancelButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
});
