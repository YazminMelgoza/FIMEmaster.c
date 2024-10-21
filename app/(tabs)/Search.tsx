import { MaterialIcons } from '@expo/vector-icons';
import { router, Link } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function About() {
  const [quizzes, setQuizzes] = useState([
    {
      title: 'Error de condicion while',
      description: 'Maria de Leon',
      iconType: 'image', // Cambiamos el tipo a 'image'
      icon:'',
      imageSource: require('../../assets/images/user.png'), // Ruta de la imagen personalizada
      color: '#4CAF50',
      textColor: '#2D2D2D',
    },
    {
      title: 'Programa Arrays',
      description: 'Estructura de Datos',
      iconType: 'icon', // Tipo icono
      icon: 'reorder',
      color: '#2196F3',
      textColor: '#2D2D2D',
    },
    {
      title: 'Programa calculadora',
      description: 'Lógica matemática',
      iconType: 'icon', // Tipo icono
      icon: 'bar-chart',
      color: '#9C27B0',
      textColor: '#2D2D2D',
    },
    {
      title: 'Programa calculadora',
      description: 'Lógica matemática',
      iconType: 'icon', // Tipo icono
      icon: 'bar-chart',
      color: '#9C27B0',
      textColor: '#2D2D2D',
    },
    {
      title: 'Programa calculadora',
      description: 'Lógica matemática',
      iconType: 'icon', // Tipo icono
      icon: 'bar-chart',
      color: '#9C27B0',
      textColor: '#2D2D2D',
    },
    // Puedes agregar más items si lo deseas
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('home');

  const handleCreateQuiz = () => {
    console.log('Crear test');
    router.navigate('quiz');
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/imagetextura2.png')}
          style={styles.headerBackgroundImage}
        />
        <View style={styles.headerContent}>
          {/* Barra de búsqueda */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <Icon name="search" size={24} color="#888" style={styles.searchIcon} />
          </View>
          <View style={styles.rayasContainer}>
            <Image source={require('../../assets/images/rayas.png')} style={styles.rayas} />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.whiteBackgroundContainer}>
        <View style={styles.quizListContainer}>
          <View style={styles.quizListHeader}>
            <Text style={styles.quizListTitle}>Ejercicios</Text>
          </View>

          {filteredQuizzes.map((quiz, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quizItem, { backgroundColor: '#fff', borderColor: quiz.color }]}
              onPress={handleCreateQuiz}
            >
              <View style={styles.quizItemIcon}>
                {quiz.iconType === 'image' ? (
                  <Image source={quiz.imageSource} style={styles.quizImage} />
                ) : (
                  <Icon name={quiz.icon} size={30} color={quiz.color} />
                )}
              </View>
              <View style={styles.quizItemDetails}>
                <Text style={[styles.quizItemTitle, { color: quiz.textColor }]}>
                  {quiz.title}
                </Text>
                <Text style={styles.quizItemDescription}>{quiz.description}</Text>
              </View>
              <Icon name="arrow-forward-ios" size={20} color={quiz.color} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'column',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 40,
    marginBottom: 0,
    position: 'relative',
  },
  headerBackgroundImage: {
    width: 1000,
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flex: 1, // Esto hará que el input ocupe todo el espacio disponible
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  rayasContainer: {
    marginRight: 10,
  },
  rayas: {
    marginTop:30,
    width: 30,
    height: 30,
  },
  whiteBackgroundContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  quizListContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quizListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  quizListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quizItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quizItemIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  quizImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  quizItemDetails: {
    flex: 1,
  },
  quizItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizItemDescription: {
    color: '#666',
    fontSize: 14,
  },
});


