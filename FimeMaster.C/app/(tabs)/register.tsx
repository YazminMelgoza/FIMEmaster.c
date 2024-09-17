import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SocialIcon, CheckBox, Button } from 'react-native-elements';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>
      <Text style={styles.subtitle}>Crea una new cuenta para comenzar a aprender.</Text>

      <View style={styles.socialContainer}>
        <SocialIcon title="Facebook" button type="facebook" />
        <SocialIcon title="Google" button type="google" />
      </View>

      <Text style={styles.orText}>Or</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <CheckBox
        title="I'm agree to the Terms of Service and Privacy Policy"
        checked={isTermsAccepted}
        onPress={() => setIsTermsAccepted(!isTermsAccepted)}
        containerStyle={styles.checkbox}
      />

      <Button
        title="Crear cuenta"
        onPress={() => { /* Lógica para crear cuenta */ }}
        buttonStyle={styles.createAccountButton}
      />

      <TouchableOpacity onPress={() => { /* Navegar a iniciar sesión */ }}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? Iniciar sesión.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginVertical: 10,
  },
  createAccountButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
  },
  loginText: {
    textAlign: 'center',
    color: '#007bff',
    marginTop: 20,
  },
});

export default RegisterScreen;
