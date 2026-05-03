import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getShopById } from '../api/barbershops';
import { createBooking } from '../api/bookings';
import { useBookingStore } from '../store/bookingStore';
import { BarberShop, Service } from '../types';

export default function BookingScreen({ navigation }: any) {
  const route = useRoute<any>();
  const { shopId } = route.params;
  const [shop, setShop] = useState<BarberShop | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const { createBooking: createBookingStore } = useBookingStore();

  useEffect(() => {
    fetchShop();
  }, [shopId]);

  const fetchShop = async () => {
    try {
      const { data } = await getShopById(shopId);
      setShop(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load shop');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedService || !date) {
      Alert.alert('Error', 'Please select a service and date');
      return;
    }

    setBooking(true);
    try {
      await createBookingStore(shopId, selectedService.id, date, undefined, notes);
      Alert.alert('Success', 'Booking created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking');
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>
      <Text style={styles.subtitle}>{shop?.name}</Text>

      <Text style={styles.sectionTitle}>Select Service</Text>
      {shop?.services?.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={[styles.serviceOption, selectedService?.id === service.id && styles.selectedService]}
          onPress={() => setSelectedService(service)}
        >
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text>${service.price} - {service.duration} min</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Date & Time</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DDTHH:MM:SSZ"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.sectionTitle}>Notes (Optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Any special requests..."
        value={notes}
        onChangeText={setNotes}
        multiline={true}
        numberOfLines={4}
      />

      <Button title={booking ? 'Booking...' : 'Confirm Booking'} onPress={handleBooking} disabled={booking} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 12 },
  serviceOption: { padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 8 },
  selectedService: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  serviceName: { fontSize: 16, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
});
