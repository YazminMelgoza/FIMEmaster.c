import { router, Link  } from 'expo-router';
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function About() 
{
  const [quizzes, setQuizzes] = useState([
    {
      title: 'Programa Arrays',
      description: 'Estructura de Datos',
      icon: 'bar-chart',
      color: '#4CAF50',
      textColor: '#2D2D2D',
    },
    {
      title: 'Programa Arrays',
      description: 'Estructura de Datos',
      icon: 'reorder',
      color: '#2196F3',
      textColor: '#2D2D2D',
    },
    {
      title: 'Programa calculadora',
      description: 'Lógica matemática',
      icon: 'bar-chart',
      color: '#9C27B0',
      textColor: '#2D2D2D',
    },
    {
        title: 'Programa calculadora',
        description: 'Lógica matemática',
        icon: 'bar-chart',
        color: '#9C27B0',
        textColor: '#2D2D2D',
      },
      {
        title: 'Programa calculadora',
        description: 'Lógica matemática',
        icon: 'bar-chart',
        color: '#9C27B0',
        textColor: '#2D2D2D',
      },
  ]);

  const [selectedTab, setSelectedTab] = useState('home');

  const handleCreateQuiz = () => {
    console.log('Crear test');
    router.navigate('quiz');
  };
  /*
  const handleScanCode = () => {
    console.log('Escanear código');
    router.replace('/(creacionquiz)/qr/scan'); 

  };*/

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/imagetextura2.png')}
          style={styles.headerBackgroundImage}
        />
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
           
            <Text style={styles.headerName}>Mis ejercicios</Text>
          </View>
         
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.whiteBackgroundContainer}>
        <View style={styles.quizListContainer}>
          <View style={styles.quizListHeader}>
            <Text style={styles.quizListTitle}>Quiz </Text>
            
          </View>

          {quizzes.map((quiz, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quizItem, { backgroundColor: '#fff', borderColor: quiz.color }]}
              onPress={handleCreateQuiz}
            >
              <View style={styles.quizItemIcon}>
                <Icon name={quiz.icon} size={30} color={quiz.color} />
              </View>
              <View style={styles.quizItemDetails}>
                <Text style={[styles.quizItemTitle, { color: quiz.textColor }]}>
                  {quiz.title}
                </Text>
                <Text style={styles.quizItemDescription}>
                  {quiz.description}
                </Text>
              </View>
              <Icon name="arrow-forward-ios" size={20} color={quiz.color} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/*<View style={styles.footer}>
        <TouchableOpacity onPress={() => setSelectedTab('home')}>
          <Icon
            name="home"
            size={30}
            color={selectedTab === 'home' ? '#4CAF50' : '#bbb'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('search')}>
          <Icon
            name="search"
            size={30}
            color={selectedTab === 'search' ? '#4CAF50' : '#bbb'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('stats')}>
          <Icon
            name="bar-chart"
            size={30}
            color={selectedTab === 'stats' ? '#4CAF50' : '#bbb'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('account')}>
          <Icon
            name="account-circle"
            size={30}
            color={selectedTab === 'account' ? '#4CAF50' : '#bbb'}
          />
        </TouchableOpacity>
      </View>
      */}
    </View>
  );
};

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
  headerTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10, 
  },
 
 
  headerName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  buttonIcon: {
    marginBottom: 5,
  },
  buttonText: {
    color: '#3BA76B',
    fontSize: 18,
    fontWeight: 'bold',
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
  quizListSeeAll: {
    paddingVertical: 5,
    paddingHorizontal: 10,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
});


