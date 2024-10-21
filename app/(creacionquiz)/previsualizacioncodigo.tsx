import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Encabezado con imagen de fondo */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/imagetextura2.png')}
          style={styles.backgroundImage}
        />
        <TouchableOpacity style={styles.backButton}>
          <Image source={require('../../assets/images/flechaAtras.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Crear un nuevo quiz</Text>
      </View>

      {/* Fondo blanco */}
      <View style={styles.quizListContainer}>
        <Text style={styles.loadingText}>Previsualización del código</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    height: 200,  // Ajustar la altura del encabezado
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden', // Para asegurarse de que la imagen no se salga del contenedor
    marginBottom: 20,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',  // Hacer que la imagen de fondo se ajuste a todo el ancho
    height: '100%',  // Ajustar la imagen a la altura del contenedor
    position: 'absolute',
    resizeMode: 'cover',  // Asegura que la imagen se ajuste sin deformarse
  },
  headerText: {
    color: '#fff',
    fontSize: 24,  // Tamaño del texto un poco más grande para mejor legibilidad
    fontWeight: 'bold',
    zIndex: 1,
    position: 'absolute',
    top: '50%',  // Centrar el texto verticalmente
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,  // Ajustar para estar más alineado con el encabezado
    zIndex: 2,
  },
  backIcon: {
    width: 24,  // Ajustar tamaño del icono
    height: 24,
  },
  quizListContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 30, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loadingText: {
    fontSize: 18,  // Hacer el texto un poco más grande
    color: '#00622A',
    textAlign: 'center',  // Centrar el texto
  },
});

export default App;
