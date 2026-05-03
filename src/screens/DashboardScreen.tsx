import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useBookingStore } from '../store/bookingStore';
import BookingCard from '../components/BookingCard';
import CustomButton from '../components/CustomButton';
import GradientBackground from '../components/GradientBackground';
import StatsCard from '../components/StatsCard';
import EmptyState from '../components/EmptyState';
import UserMenu from '../components/UserMenu';

export default function DashboardScreen({ navigation }: any) {
  const { user, logout } = useAuthStore();
  const { bookings, fetchBookings, cancelBooking } = useBookingStore();
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

  const history = bookings.filter((b) => ['COMPLETED', 'CANCELLED'].includes(b.status));

  return (
    <GradientBackground variant="classic">
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
            <View>
              <Text style={styles.title}>📊 Dashboard</Text>
              <Text style={styles.subtitle}>Manage your profile and bookings</Text>
            </View>
            <UserMenu onLogout={logout} navigation={navigation} />
          </View>

          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.statsCarousel}
            contentContainerStyle={styles.statsCarouselContent}
          >
            <StatsCard
              title="Total Bookings"
              value={bookings.length}
              subtitle="All time"
              color="#6366F1"
              icon="📊"
            />
            <StatsCard
              title="Completed"
              value={bookings.filter(b => b.status === 'COMPLETED').length}
              subtitle="Finished"
              color="#10B981"
              icon="✅"
            />
            <StatsCard
              title="Pending"
              value={bookings.filter(b => b.status === 'PENDING').length}
              subtitle="Awaiting"
              color="#f5291aff"
              icon="⏳"
            />
          </ScrollView>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            <View style={styles.profileCard}>
              <View style={styles.profileHeader}>
                <Text style={styles.profileIcon}>👤</Text>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{user?.name || 'User'}</Text>
                  <Text style={styles.profileRole}>{user?.role}</Text>
                </View>
              </View>
              <View style={styles.profileDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📧 Email</Text>
                  <Text style={styles.detailValue}>{user?.email}</Text>
                </View>
                {user?.phone && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>📱 Phone</Text>
                    <Text style={styles.detailValue}>{user.phone}</Text>
                  </View>
                )}
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📅 Member Since</Text>
                  <Text style={styles.detailValue}>
                    {new Date(user?.createdAt || '').toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Upcoming Bookings</Text>
            {bookings.filter((b) => ['PENDING', 'CONFIRMED'].includes(b.status)).length === 0 ? (
              <EmptyState
                icon="📅"
                title="No upcoming bookings"
                subtitle="You don't have any upcoming appointments"
              />
            ) : (
              bookings
                .filter((b) => ['PENDING', 'CONFIRMED'].includes(b.status))
                .map((booking, index) => (
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
                      showActions={true}
                      onCancel={cancelBooking}
                    />
                  </Animated.View>
                ))
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Booking History</Text>
            {history.length === 0 ? (
              <EmptyState
                icon="📋"
                title="No booking history"
                subtitle="Your completed and cancelled bookings will appear here"
              />
            ) : (
              history.map((booking, index) => (
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
                  />
                </Animated.View>
              ))
            )}
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
  title: { 
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  statsCarousel: {
    marginBottom: 24,
  },
  statsCarouselContent: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  profileDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
});
