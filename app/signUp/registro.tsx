import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import signUpWithEmail from './services';


// Yup validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El apellido paterno es obligatorio'),
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
});

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const { firstName, lastName, email, password } = values;
        await signUpWithEmail(email, password, firstName, lastName);
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Image source={require('../../assets/images/oso.jpg')} style={styles.icon} />
          
          <Text style={styles.title}>Regístrate</Text>
          <Text style={styles.subtitle}>Crea una nueva cuenta para comenzar a aprender</Text>

          <Text style={styles.orDivider}>Or</Text>

          {/* First Name Input */}
          <View style={styles.inputField}>
            <TextInput
              placeholder="Nombres"
              placeholderTextColor="#000000"
              style={styles.textInput}
              onChangeText={handleChange('firstName')}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          </View>

          {/* Last Name Input */}
          <View style={styles.inputField}>
            <TextInput
              placeholder="Apellido paterno"
              placeholderTextColor="#000000"
              style={styles.textInput}
              onChangeText={handleChange('lastName')}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
          </View>

          {/* Email Input */}
          <View style={styles.inputField}>
            <TextInput
              placeholder="Correouniversitario@unal.edu.mx"
              placeholderTextColor="#000000"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password Input */}
          <View style={styles.passwordField}>
            <TextInput
              style={styles.inputField}
              placeholder="Contraseña"
              placeholderTextColor="#000000"
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
              <Image source={require('../../assets/images/Vector.png')} style={styles.iconEye} />
            </TouchableOpacity>
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()}>
            <Text style={styles.loginButtonText}>Crear una cuenta</Text>
          </TouchableOpacity>

          <Text style={styles.registerLink}>
            ¿Ya tienes una cuenta?
            <TouchableOpacity onPress={() => SignUp}>
              <Text style={styles.registerLinkSpan}> Inicia Sesión</Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  // Tus estilos aquí
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
    height: 45,
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

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

