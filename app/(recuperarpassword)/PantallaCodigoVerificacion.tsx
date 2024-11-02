import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';

export default function VerificationScreen() {
  const [code, setCode] = useState(['', '', '', '']);

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };
  
  return (
    <View style={styles.container}>
      {/* Icono de regresar */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Imagen */}
      <Image source={require('../../assets/images/image.png')} style={styles.image} />

      {/* Título */}
      <Text style={styles.title}>Ingresa el código</Text>

      {/* Descripción */}
      <Text style={styles.description}>
        Te enviamos un código de un solo uso a tu correo electrónico. Ingrésalo aquí para verificar tu correo.
      </Text>

      {/* Campos de código */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(value) => handleCodeChange(index, value)}
            value={digit}
          />
        ))}
      </View>

      {/* Botón de Verificar */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4caf50' }]}>
        <Text style={styles.buttonText}>Verificar correo</Text>
      </TouchableOpacity>

      {/* Enlace de Reenviar */}
      <TouchableOpacity style={styles.resendContainer}>
        <Text style={styles.resendText}>¿No te llegó el código? </Text>
        <Text style={styles.resendLink}>Reenviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginVertical: 16,
  },
  backText: {
    fontSize: 24,
    color: '#333',
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 32,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 16,
    justifyContent: 'center',   
    alignItems: 'center',  
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 16,
    color: '#666',
  },
  resendLink: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: 'bold',
  },
});
