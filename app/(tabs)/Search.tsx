import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function Search()
{
  

  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};


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
    height: 45,
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
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  registerText: {
    color: '#28a745',
    fontWeight: 'bold',
    textAlign:'left',
    
  },
  
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});