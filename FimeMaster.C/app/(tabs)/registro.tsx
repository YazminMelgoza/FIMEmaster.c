import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Para navegación si la usas en Expo
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigation = useNavigation(); // Para navegación en Expo
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  }
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/oso.jpg')} style={styles.icon} />

      <Text style={styles.title}>Regístrate</Text>
      
      <Text style={styles.subtitle}>Crea una nueva cuenta  para comenzar a aprender</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('@/assets/images/_Facebook.png')} style={styles.iconeye} />
          <Text>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('@/assets/images/_Google.png')} style={styles.iconeye} />
          <Text>Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orDivider}>Or</Text>

      <View style={styles.inputField}>
        <TextInput 
        placeholder="Nombres" 
        placeholderTextColor= "#000000"
        style={styles.textInput} 
        />
      </View>

      <View style={styles.inputField}>
        <TextInput 
        placeholder="Apellido paterno" 
           placeholderTextColor= "#000000"
        style={styles.textInput} 
        />
      </View>
      <View style={styles.inputField}>
        <TextInput 
        placeholder="Apellido materno" 
           placeholderTextColor= "#000000"
        style={styles.textInput} 
        />
      </View>

      <View style={styles.inputField}>
        <TextInput 
        placeholder="Correouniversitario@unal.edu.mx" 
           placeholderTextColor= "#000000"
        style={styles.textInput} 
        keyboardType="email-address" 
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
        <Text style={styles.forgotPassword}>I'm agree to the <Text style={styles.registerLinkSpan}>Terms of service</Text>  and </Text>
        
        <Text style={styles.registerLinkSpan}> Privacy  Policy </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Crear cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.registerLink}>
          ¿Ya tienes una cuenta? <Text style={styles.registerLinkSpan}>Iniciar sesion</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};


export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  icon: {
    width: 100,
    height: 100,
    
    marginTop: 10,
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
    marginTop:0,
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  iconeye: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  orDivider: {
    color: 'black',
    margin: 10,
  },
  inputField: {
    backgroundColor: '#F5F9FE',
    borderRadius: 10,
    width: '100%',
    height: 40,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    color: '#000',
  },
  passwordField: {
    position: 'relative',
    width: '100%',
    marginBottom: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 20,
    height: 20,
  },
  forgotPassword: {
    color: '#000000',
    fontSize: 14,
    
    textAlign: 'right',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#28a745',
    width: '100%',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
  registerLinkSpan: {
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom:15,
  },
});