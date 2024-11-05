import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

export default function LoadingScreen(){
  const progress = new Animated.Value(0);

  useEffect(() => {
    const startAnimation = () => {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: 1000, 
        useNativeDriver: false,
      }).start(() => startAnimation()); // reinicio de barra 
    };

    startAnimation();
  }, [progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200], 
  });

  return (
    <View style={styles.container}>
      <Image
         source={require('../assets/images/fime-logo.png')} 
        style={styles.logo}
      />
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { transform: [{ translateX }] }]} />
      </View>
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 110,
    height: 100,
    marginBottom: 20,
    opacity: 0.7, 
  },
  progressBarContainer: {
    width: 200,
    height: 20,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    width: '50%',
    height: '100%',
    backgroundColor: '#28a745',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
  },
});


