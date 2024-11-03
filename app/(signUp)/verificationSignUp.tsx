import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';
type Params = {
  emailRecibido?: string; 
};
//import { LinearGradient } from 'expo-linear-gradient';

export default function VerificationScreen() {
  const { emailRecibido } = useLocalSearchParams<Params>();
  const [appIsReady, setAppIsReady] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(30); // 30 segundos de bloqueo
  useEffect(() => {
    async function prepare() {
      try {
        if (emailRecibido) {
          setEmail(emailRecibido);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, [emailRecibido]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isButtonDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsButtonDisabled(false);
            clearInterval(interval);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isButtonDisabled]);

  const handleCodeChange = (text: string, index: number) => {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      setToken(newCode.join(''));
      // Si se ingresa un dígito y no es el último campo, avanza al siguiente
      if (text && index < 5) {
          inputs.current[index + 1]?.focus();
      }

      // Si se borra el dígito y no es el primer campo, vuelve al anterior
      if (!text && index > 0) {
          inputs.current[index - 1]?.focus();
      }
  };
  const enviarEmail = async () =>
  {
    setIsButtonDisabled(true);
    //const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    })
    console.log("email enviado: " + email);
  }
  const goBack = async () =>
  {
    router.back();
  }

  const confirmarToken = async (tokenFun: string, emailFun: string) =>
  {
    if(tokenFun == "" && emailFun == "")
    {
      return;
    }
    console.log("Token: " + token + " Email:" + email);
    
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email'});
    if (!error && data) {
      console.log("Verificación completada con éxito:", data);
      router.replace("confirmationSignUp");
    } else {
        console.error("Error en la verificación:", error?.message);
    }
    
  }
  if(!appIsReady){
    return(
      <View >
            <Text >Enviando correo...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Icono de regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      

      {/* Imagen */}
      <Image source={require('../../assets/images/image.png')} style={styles.image} />

      {/* Título */}
      <Text style={styles.title}>Ingresa el código</Text>

      {/* Descripción */}
      <Text style={styles.description}>
        Te enviamos un código de un solo uso a tu correo electrónico: {email + " " || " No definido " } 
        Ingrésalo aquí para verificar tu correo.
      </Text>

      {/* Campos de código */}
      <View style={styles.codeContainer}>
        
        {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)} 
              style={styles.codeInput}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
            />
          ))}
      </View>

      {/* Botón de Verificar */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4caf50' }]} onPress={() => confirmarToken(token, email)}>
        <Text style={styles.buttonText}>Verificar código</Text>
      </TouchableOpacity>

      {/* Enlace de Reenviar */}
      <TouchableOpacity style={styles.resendContainer} onPress={() => enviarEmail()} disabled={isButtonDisabled}>
        <Text style={styles.resendText}>¿No te llegó el código? </Text>

        <Text style={styles.resendLink}>{isButtonDisabled ? `Reenviar en ${timer}s` : "Reenviar"}</Text>
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
