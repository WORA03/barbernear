import React from 'react';
import { View, StyleSheet } from 'react-native';

interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: 'barber' | 'classic' | 'modern' | 'vintage';
}

export default function GradientBackground({ 
  children, 
  variant = 'barber'
}: GradientBackgroundProps) {
  const getColors = () => {
    switch (variant) {
      case 'classic':
        return ['#1F2937', '#374151', '#4B5563']; // Grises clásicos de barbería
      case 'modern':
        return ['#7C2D12', '#92400E', '#B45309']; // Cafés modernos
      case 'vintage':
        return ['#78350F', '#92400E', '#A16207']; // Tonos vintage madera
      default: // barber
        return ['#1E293B', '#334155', '#475569']; // Azules oscuros tipo barbería
    }
  };

  const getBackgroundColors = () => {
    switch (variant) {
      case 'classic':
        return ['#F5F5F5', '#E5E5E5', '#D4D4D8'];
      case 'modern':
        return ['#FEF3C7', '#FED7AA', '#FDBA74'];
      case 'vintage':
        return ['#FEF9C3', '#FEF3C7', '#FDE68A'];
      default: // barber
        return ['#F8FAFC', '#F1F5F9', '#E2E8F0'];
    }
  };

  const colors = getColors();
  const bgColors = getBackgroundColors();

  return (
    <View style={styles.container}>
      {/* Background base */}
      <View style={[styles.backgroundBase, { backgroundColor: bgColors[0] }]} />
      
      {/* Thematic gradients */}
      <View style={[styles.gradient1, { backgroundColor: colors[0] }]} />
      <View style={[styles.gradient2, { backgroundColor: colors[1] }]} />
      <View style={[styles.gradient3, { backgroundColor: colors[2] }]} />
      
      {/* Decorative elements */}
      <View style={[styles.decorCircle1, { backgroundColor: bgColors[1] }]} />
      <View style={[styles.decorCircle2, { backgroundColor: bgColors[2] }]} />
      <View style={[styles.decorLine1, { backgroundColor: colors[0] }]} />
      <View style={[styles.decorLine2, { backgroundColor: colors[1] }]} />
      
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient1: {
    position: 'absolute',
    top: -200,
    right: -100,
    width: 500,
    height: 500,
    borderRadius: 250,
    opacity: 0.08,
  },
  gradient2: {
    position: 'absolute',
    bottom: -200,
    left: -100,
    width: 600,
    height: 600,
    borderRadius: 300,
    opacity: 0.06,
  },
  gradient3: {
    position: 'absolute',
    top: '40%',
    right: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    opacity: 0.04,
  },
  decorCircle1: {
    position: 'absolute',
    top: 50,
    left: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.3,
  },
  decorCircle2: {
    position: 'absolute',
    bottom: 100,
    right: 50,
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.25,
  },
  decorLine1: {
    position: 'absolute',
    top: 150,
    left: -20,
    width: 100,
    height: 3,
    borderRadius: 2,
    opacity: 0.1,
    transform: [{ rotate: '45deg' }],
  },
  decorLine2: {
    position: 'absolute',
    bottom: 200,
    right: -30,
    width: 120,
    height: 2,
    borderRadius: 1,
    opacity: 0.08,
    transform: [{ rotate: '-30deg' }],
  },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
});
