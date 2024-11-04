import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Pressable, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { router } from 'expo-router';
import { Tables } from "database.types";
import { ExerciseService } from "../../services/exercise";
import { supabase } from "../../lib/supabase";
const EscanearCodigo: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState('Escaneando...');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const decodeBase64 = (data: string) => {
    try {
      const decodedData = atob(data);
      return decodedData;
    } catch (error) {
      console.error("Error decodificando Base64: ", error);
      return null;
    }
  };

  const handleCreateQuiz = (quizId: number) => {
    console.log("Crear test con ID:", quizId);
    router.push(`iniciarQuiz?id=${quizId}`);
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    const decodedData = decodeBase64(data);
    if (decodedData) {
      const numberValue = parseInt(decodedData, 10);
      setScanning('Escaneado!');
      handleCreateQuiz(numberValue); // Navega al quiz usando el ID escaneado
      ToastAndroid.show(`Código escaneado: ${numberValue}`, ToastAndroid.LONG);
    } else {
      setScanning('Error al decodificar el código.');
      ToastAndroid.show('Error al decodificar el código.', ToastAndroid.LONG);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }
  if (!hasPermission) {
    return <Text>No se concedió acceso a la cámara</Text>;
  }

  return (
    <View style={styles.escanearCodigo}>
      
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
      <Text style={styles.escaneando}>{scanning}</Text>
      <View style={styles.roundedRectangle}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Text onPress={() => { setScanned(false); setScanning('Escaneando...'); }} style={styles.button}>
            Escanear de nuevo
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  escanearCodigo: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  statusBarLight: {
    height: 42,
    width: '100%',
    position: 'absolute',
    top: 0,
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
    fontWeight: 'bold',
    textAlign: 'center',
    width: '70%',
  },
  escaneando: {
    fontSize: 18,
    color: '#a7a7a7',
    position: 'absolute',
    bottom: 100,
    textAlign: 'center',
  },
  roundedRectangle: {
    width: '85%',
    height: '55%',
    position: 'absolute',
    top: '25%',
    borderRadius: 40,
    backgroundColor: '#f3fff3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    color: 'blue',
    marginTop: 20,
  },
});

export default EscanearCodigo;

