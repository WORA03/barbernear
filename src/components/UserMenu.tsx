import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useAuthStore } from '../store/authStore';

interface UserMenuProps {
  onLogout: () => void;
  navigation: any;
}

export default function UserMenu({ onLogout, navigation }: UserMenuProps) {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(-10)).current;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -10,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const handleLogout = () => {
    toggleMenu();
    onLogout();
  };

  const handleSettings = () => {
    toggleMenu();
    navigation.navigate('AccountSettings');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.userButton} 
        onPress={() => {
          console.log('UserMenu pressed');
          toggleMenu();
        }}
        activeOpacity={0.8}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={[styles.dropdownIcon, isOpen && styles.dropdownIconOpen]}>
          ▼
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <Animated.View 
          style={[
            styles.menu,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              console.log('Settings pressed');
              handleSettings();
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemIcon}>⚙️</Text>
            <Text style={styles.menuItemText}>Account Settings</Text>
          </TouchableOpacity>
          
          <View style={styles.menuSeparator} />
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              console.log('Logout pressed');
              handleLogout();
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemIcon}>🚪</Text>
            <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  dropdownIconOpen: {
    transform: [{ rotate: '180deg' }],
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 180,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuItemIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  logoutText: {
    color: '#EF4444',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
});
