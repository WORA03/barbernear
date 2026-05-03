import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { useAuthStore } from '../store/authStore';
import BookingCard from '../components/BookingCard';
import CustomButton from '../components/CustomButton';
import GradientBackground from '../components/GradientBackground';
import StatsCard from '../components/StatsCard';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import UserMenu from '../components/UserMenu';
import { useBookingStore } from '../store/bookingStore';

export default function HomeScreen({ navigation }: any) {
  const { user, logout } = useAuthStore();
  const { bookings, fetchBookings } = useBookingStore();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    fetchBookings();
    
    // Animation on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const upcomingBookings = bookings.filter((b) => ['PENDING', 'CONFIRMED'].includes(b.status));

  return (
    <GradientBackground variant="barber">
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View style={styles.header}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting} numberOfLines={1}>👋 Hi, {user?.name || 'User'}!</Text>
              <Text style={styles.subtitle}>Welcome back to BarberNear</Text>
            </View>
            <UserMenu onLogout={logout} navigation={navigation} />
          </View>

          <View style={styles.statsContainer}>
            <StatsCard
              title="Total Bookings"
              value={bookings.length}
              subtitle="All time"
              color="#6366F1"
              icon="📅"
            />
            <StatsCard
              title="Upcoming"
              value={upcomingBookings.length}
              subtitle="This month"
              color="#10B981"
              icon="⏰"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Upcoming Bookings</Text>
            {upcomingBookings.length === 0 ? (
              <EmptyState
                icon="📅"
                title="No upcoming bookings"
                subtitle="Book your first appointment to get started with amazing barbershops near you"
                actionTitle="Find Barbershops"
                onAction={() => navigation.navigate('Nearby')}
              />
            ) : (
              upcomingBookings.map((booking, index) => (
                <Animated.View
                  key={booking.id}
                  style={{
                    opacity: fadeAnim,
                    transform: [{
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 20 * index],
                      })
                    }],
                  }}
                >
                  <BookingCard
                    booking={booking}
                    onPress={() => navigation.navigate('Booking', { bookingId: booking.id })}
                  />
                </Animated.View>
              ))
            )}
          </View>

          <View style={styles.section}>
            <CustomButton
              title="🔍 Find Nearby Barbershops"
              onPress={() => navigation.navigate('Nearby')}
              size="large"
              style={styles.actionButton}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: { 
    flex: 1, 
    padding: 20,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: { 
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  section: { 
    marginBottom: 24,
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 16,
    color: '#111827',
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: { 
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 20,
  },
});
