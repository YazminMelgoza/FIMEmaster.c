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
        <Text style={styles.headerText}>Generando Quiz...</Text>
      </View>

      {/* Fondo blanco  */}
      <View style={styles.quizListContainer}>
        <Text style={styles.loadingText}>Generando preguntas...</Text>
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
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
  },
  backgroundImage: {
    width: 1000,
    height: 250,
    position: 'absolute',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    left: 30,
    top: 40,
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 65,
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    paddingTop: 30,
  },
  quizListContainer: {
    flex: 1,
    marginTop: 20,
    width: '100%',
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
    fontSize: 16,
    color: '#000',
    textAlign: 'left', 
    marginLeft: 20,  
  },
});

export default App;
