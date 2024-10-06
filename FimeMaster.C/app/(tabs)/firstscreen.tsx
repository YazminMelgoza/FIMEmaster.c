import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook de React Navigation

const SplashScreen = () => {
  const navigation = useNavigation(); // Para la navegación en React Native

  useEffect(() => {
    // Después de 4 segundos, redirigir a la pantalla de login
    const timer = setTimeout(() => {
        // Redirige a la pantalla de login
    }, 4000);

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <Image source={require('@/assets/images/oso.jpg')} style={styles.splashLogo} />
      <Text style={styles.splashTitle}>master.c</Text>
      <Image source={require('@/assets/images/vivalafime.jpg')} style={styles.vivalafime} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Color de fondo blanco
  },
  splashLogo: {
    width: 250,
    height: 250,
    
  },
  splashTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00953b', // Verde representativo
    marginBottom:200
  },
  vivalafime: {
    marginTop: 50
  },
});