import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
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
import { Tables } from 'database.types';
import { ExerciseService } from 'services/exercise';

const getColor = (categoryid: number | null): string => {
  switch (categoryid) {
    case 1:
      return '#4CAF50';
    case 2:
      return '#9C27B0';
    case 3:
      return '#2196F3';
    default:
      return '#FF7575'
  }
};

const QuizItem: React.FC<{ quiz: Tables<"exercises">; onPress: () => void }> = ({ quiz, onPress }) => {

  const color = getColor(quiz.categoryid ?? null);


  return (
    <TouchableOpacity
      style={[styles.quizItem, { backgroundColor: '#fff', borderColor: '#ccc' }]}
      onPress={onPress}
    >
      <Icon name="bar-chart" size={20} color={color} style={styles.quizItemIcon} />
      <View style={styles.quizItemDetails}>
        <Text style={[styles.quizItemTitle, { color: '#333' }]}>
          {quiz.title || 'Título no disponible'}
        </Text>
        <Text style={styles.quizItemDescription}>
          {quiz.instructions || 'Sin instrucciones'}
        </Text>
      </View>
      <Icon name="arrow-forward-ios" size={20} color={color} />
    </TouchableOpacity>
  );
};

export default function About() {
  const [quizzes, setQuizzes] = useState<Tables<"exercises">[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trimmedQuery = searchQuery.trim(); // Limpia solo los espacios innecesarios
        const quizzesData = await ExerciseService.getExercisesByTitle(trimmedQuery);

        // Si no hay resultados y `searchQuery` tiene espacios, limpia los espacios adicionales
        if (quizzesData.exercises.length === 0 && searchQuery !== trimmedQuery) {
          setSearchQuery(trimmedQuery);
        }

        setQuizzes(quizzesData.exercises);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }finally
      {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleCreateQuiz = (id: number) => {
    console.log('Crear test');
    router.push(`iniciarQuiz?id=${id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/imagetextura2.png')}
          style={styles.headerBackgroundImage}
        />
        <View style={styles.headerContent}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}  // Permite espacios en el input
            />
            <Icon name="search" size={24} color="#888" style={styles.searchIcon} />
          </View>
         
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.whiteBackgroundContainer}>
        <View style={styles.quizListContainer}>
          <View style={styles.quizListHeader}>
            <Text style={styles.quizListTitle}>Ejercicios</Text>
          </View>

          {quizzes?.length === 0 && !loading ? (
              <Text style={styles.noAttemptsText}>No hay resultados</Text>
            ) : (
          quizzes?.map((quiz) => (
            <QuizItem 
              key={quiz.exerciseid} 
              quiz={quiz} 
              onPress={() => handleCreateQuiz(quiz.exerciseid)} 
            />
          ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  noAttemptsText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',       
    fontSize: 16,       
    fontWeight: '500',   
  },
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
    flex: 1,
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
    marginTop: 30,
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
  quizItemIcon: {
    marginRight: 10,
  },
});
