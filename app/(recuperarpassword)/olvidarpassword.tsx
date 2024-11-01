import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const navigation = useNavigation();
 
  const enviarEmail = async () =>
  {
    if(email != "")
    {
      router.push(`codigopassword?emailRecibido=${email}`);
    }
    /*
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    console.log("email enviado");
    */
  }
  const confirmarToken = async (token: string) =>
  {
    console.log("Token: " + token + " Email:" + email);
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email'});
    if (!error && data) {
      console.log("Verificación completada con éxito:", data);
      router.replace("confirmarpassword");
    } else {
        console.error("Error en la verificación:", error?.message);
    }
  }
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Olvidé mi contraseña</Text>

      <Text style={styles.instructions}>
        Ingresa tu correo para que te enviemos un código con el que podrás recuperar tu contraseña
      </Text>

      <TextInput
        style={styles.input}
        placeholder="correo@example.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="codigo"
        keyboardType="default"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button}  onPress={() =>
                enviarEmail()
                }>
        <Text style={styles.buttonText}>Enviar código</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.registerText}>
          ¿No tienes una cuenta? <Text style={styles.registerLink}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745', // Color verde
    marginBottom: 20,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6f6f6f',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745', // Color verde del botón
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 14,
    color: '#6f6f6f',
  },
  registerLink: {
    color: '#28a745', // Color verde del enlace
    fontWeight: 'bold',
  },
});
