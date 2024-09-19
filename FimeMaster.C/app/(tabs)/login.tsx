import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Para navegación si la usas en Expo

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation(); // Para navegación en Expo

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.loginContainer}>
      <Image source={require('@/assets/images/Wave.png')} style={styles.icon} />

      <Text style={styles.title}>Inicia Sesión</Text>

      <Text style={styles.subtitle}>
        Ingresa tus datos para comenzar a utilizar la aplicación.
      </Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('@/assets/images/_Facebook.png')} style={styles.iconEye} />
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('@/assets/images/_Google.png')} style={styles.iconEye} />
          <Text style={styles.buttonText}>Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orDivider}>Or</Text>

      <View style={styles.containerInputs}>
        <View style={styles.emailField}>
          <TextInput
            style={styles.inputField}
            placeholder="Correouniversitario@unal.edu.mx"
            placeholderTextColor= "#000000"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>

        <View style={styles.passwordField}>
          <TextInput
            style={styles.inputField}
            placeholder=""
               placeholderTextColor= "#000000"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Image source={require('@/assets/images/Vector.png')} style={styles.iconEye} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText}>Log in</Text>
      
    
      </TouchableOpacity>
      <Text style={styles.registerLink}>
          ¿No tienes una cuenta? <Text style={styles.registerText}>Regístrate</Text>
        </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  iconEye: {
    width: 20,
    height: 20,
  },
  title: {
    color: '#008000',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#777777',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  socialButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  orDivider: {
    color: '#000',
    margin: 10,
  },
  containerInputs: {
    width: '100%',
    
  },
  emailField: {
    marginBottom: 15,
    
  },
  passwordField: {
    position: 'relative',
    marginBottom: 15,
  },
  inputField: {
    backgroundColor: '#F5F9FE',
    borderRadius: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 2,
    width: '100%',
    height:45,
  },
  forgotPassword: {
    color: '#777777',
    textAlign: 'right',
    marginBottom: 20,
  },
  eyeIcon: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
  loginButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    
  },
  registerLink: {
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#28a745',
    fontWeight: 'bold',
  },
});