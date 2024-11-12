import React, { useState, useEffect, useRef } from 'react';
import { Image, Text, View, Pressable, TextInput, ToastAndroid, StyleSheet } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { ExerciseService } from 'services/exercise';

const EscanearCodigo: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Manejo de permisos de la cámara
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');

  // Esperar a que se otorguen los permisos
  useEffect(() => {
    if (permission?.granted === false) {
      requestPermission();
    }
  }, [permission]);

  const decodeBase64 = (data: string) => {
    try {
      return atob(data);
    } catch (error) {
      console.error("Error decoding Base64:", error);
      return null;
    }
  };

  const handleCreateQuiz = (quizId: number) => {
    router.replace(`iniciarQuiz?id=${quizId}`);
  };

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (!scanned) {
      setScanned(true);
      await processCode(data);
    }
  };

  const processCode = async (data: string) => {
    const decodedData = decodeBase64(data);
    if (decodedData) {
      const quizId = parseInt(decodedData, 10);
      await fetchExerciseById(quizId);
    } else {
      ToastAndroid.show('Error al decodificar el código.', ToastAndroid.LONG);
    }
  };

  const handleManualCodeSubmit = async () => {
    if (manualCode) {
      await processCode(manualCode);
      setManualCode('');
    } else {
      ToastAndroid.show('Por favor, ingrese un código válido.', ToastAndroid.SHORT);
    }
  };

  const fetchExerciseById = async (quizId: number) => {
    const { exercise, error } = await ExerciseService.getExerciseById(quizId);
    if (error) {
      console.error("Error al obtener el ejercicio:", error);
      ToastAndroid.show('Ejercicio no encontrado.', ToastAndroid.LONG);
    } else if (exercise) {
      handleCreateQuiz(quizId);
      ToastAndroid.show(`Ejercicio encontrado: ${exercise.title}`, ToastAndroid.LONG);
    } else {
      ToastAndroid.show('No se encontró ningún ejercicio con este ID.', ToastAndroid.LONG);
    }
  };

  if (!permission) {
    // Solicitar permisos
    return <Text>Solicitando permiso para la cámara...</Text>;
  }
  if (!permission.granted) {
    // No se ha otorgado el permiso
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Pressable onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageIcon}
        resizeMode="cover"
        source={require('../../assets/images/relieve.png')}
      />
      <View style={styles.escanearCodigoChild} />
      <Pressable style={styles.vector} onPress={() => router.back()}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require('../../assets/images/vector-flecha.png')}
        />
      </Pressable>
      <Text style={styles.fotografaElCdigo}>Fotografía el código QR</Text>
      <View style={styles.roundedRectangle}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      </View>

      <View style={styles.manualCodeContainer}>
        <Text style={styles.manualCodeText}>Ingrese el código manualmente:</Text>
        <TextInput
          placeholder="Ingrese el código del quiz aquí"
          value={manualCode}
          onChangeText={setManualCode}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          style={styles.manualInput}
        />
        <Pressable style={styles.submitButton} onPress={handleManualCodeSubmit}>
          <Text style={styles.submitButtonText}>Enviar Código</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  centrarCamara:
  {
    textAlign: 'center',

  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  escanearCodigo: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageIcon: {
    width: '110%',
    height: 220,
    position: 'absolute',
    top: 42,
    resizeMode: 'contain',
  },
  escanearCodigoChild: {
    position: 'absolute',
    top: 160,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
  },
  vector: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: 30,
    height: 30,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  fotografaElCdigo: {
    fontSize: 24,
    color: '#fff',
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '70%',
  },
  roundedRectangle: {
    width: '85%',
    height: '55%',
    position: 'absolute',
    top: '25%',
    alignSelf: 'center', // Centrado horizontalmente
    borderRadius: 40,
    backgroundColor: '#f3fff3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  manualInput: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#34C759',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  manualCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  manualCodeText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
});

export default EscanearCodigo;
