import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  // Estado inicial con una lista de quizzes
  const [quizzes, setQuizzes] = useState([
    {
      title: 'Programa Arrays',
      description: 'Estructura de Datos',
      icon: 'bar-chart',
      color: '#4CAF50', // Color verde
    },
    {
      title: 'Programa Arrays',
      description: 'Estructura de Datos',
      icon: 'reorder',
      color: '#2196F3', // Color azul
    },
    {
      title: 'Programa calculadora',
      description: 'Lógica matemática',
      icon: 'functions',
      color: '#9C27B0', // Color morado
    },
  ]);

  // Estado para gestionar la pestaña seleccionada en la barra inferior
  const [selectedTab, setSelectedTab] = useState('home');

  // Función para manejar la creación de un nuevo quiz
  const handleCreateQuiz = () => {
    console.log('Crear test');
  };

  // Función para manejar el escaneo de un código
  const handleScanCode = () => {
    console.log('Escanear código');
  };

  return (
    <View style={styles.container}>
      
      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="wb-sunny" size={20} color="#FFC107" /> 
        <Text style={styles.headerText}>BUENOS DIAS</Text>
        <Text style={styles.headerName}>Yazmin Melgoza</Text>
        <Image
          source={{ uri: 'https://dummyimage.com/50x50/007bff/fff' }} // Imagen de perfil
          style={styles.profileImage}
        />
      </View>

      {/* Botones centrales */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleScanCode}>
          <View style={styles.buttonIcon}>
            <Icon name="qr-code" size={50} color="#fff" />
          </View>
          <Text style={styles.buttonText}>Escanear Código</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCreateQuiz}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="code" size={50} color="#fff" />
            <Text style={styles.buttonText}> Crear test</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Lista de quizzes recientes */}
      <View style={styles.quizListContainer}>
        <Text style={styles.quizListTitle}>Quiz Recientes</Text>
        <TouchableOpacity style={styles.quizListSeeAll}>
          <Text style={styles.quizListSeeAllText}>ver todos</Text>
        </TouchableOpacity>

        {quizzes.map((quiz, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quizItem, { backgroundColor: quiz.color }]}
          >
            <View style={styles.quizItemIcon}>
              <Icon name={quiz.icon} size={30} color="#fff" />
            </View>
            <View style={styles.quizItemDetails}>
              <Text style={styles.quizItemTitle}>{quiz.title}</Text>
              <Text style={styles.quizItemDescription}>
                {quiz.description}
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={20} color="#fff" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Barra inferior de navegación */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setSelectedTab('home')}>
          <Icon
            name="home"
            size={30}
            color={selectedTab === 'home' ? '#000' : '#bbb'} // Negro si está seleccionado, gris si no
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('search')}>
          <Icon
            name="search"
            size={30}
            color={selectedTab === 'search' ? '#000' : '#bbb'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('stats')}>
          <Icon
            name="bar-chart"
            size={30}
            color={selectedTab === 'stats' ? '#000' : '#bbb'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('account')}>
          <Icon
            name="account-circle"
            size={30}
            color={selectedTab === 'account' ? '#000' : '#bbb'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Estilos del encabezado
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4CAF50', // Fondo verde
    marginBottom: 20, // Espacio debajo del encabezado
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  headerName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  // Estilos de los botones centrales
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 20, // Espacio debajo de los botones
  },
  button: {
    backgroundColor: '#2196F3', 
    paddingVertical: 25, 
    paddingHorizontal: 30, 
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10, 
    alignItems: 'center',
  },
  buttonIcon: {
    marginBottom: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, 
    fontWeight: 'bold',
  },
  // Estilos de la lista de quizzes
  quizListContainer: {
    paddingHorizontal: 10,
    marginBottom: 20, 
  },
  quizListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quizListSeeAll: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  quizListSeeAllText: {
    color: '#007bff', 
  },
  quizItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  quizItemIcon: {
    marginRight: 15,
  },
  quizItemDetails: {
    flex: 1,
  },
  quizItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  quizItemDescription: {
    fontSize: 14,
    color: '#fff',
  },
  // Estilos de la barra inferior
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff', 
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1, 
    borderTopColor: '#ddd',
  },
});

export default App;
