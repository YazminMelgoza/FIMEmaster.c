import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { QuizService } from '../../services/quiz';
import { Quiz } from '../../models/quiz';
import { supabase } from '../../lib/supabase'; // Asegúrate de que esta ruta es correcta
import ToastManager, { Toast } from 'toastify-react-native';

export default function About() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [authorId, setAuthorId] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setAuthorId(data.user.id);
        fetchQuizzes(data.user.id);
      } else {
        console.error('Error al obtener el usuario:', error);
        Toast.error('Error al obtener el usuario.');
      }
    };
    fetchUser();
  }, []);

  const fetchQuizzes = async (userId: string) => {
    const { quizzes, error } = await QuizService.getQuizzesByAuthorId(userId);
    if (error) {
      console.error('Error al obtener los quizzes:', error);
      Toast.error('Error al obtener los quizzes.');
    } else if (!quizzes || quizzes.length === 0) {
      Toast.warn('No existen quizzes.');
    } else {
      setQuizzes(quizzes);
      Toast.success("Quizzes cargados.");
    }
  };

  const handleCreateQuiz = (quizId: number) => {
    console.log('Crear test con ID:', quizId);
    router.push(`infoQuiz?id=${quizId}`);
  };

  return (
    <View style={styles.container}>
      <ToastManager />
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
            <Text style={styles.quizListTitle}>Quiz</Text>
          </View>
          {quizzes.map((quiz) => (
            <TouchableOpacity
              key={quiz.exerciseid}
              style={[styles.quizItem, { backgroundColor: '#fff' }]}
              onPress={() => handleCreateQuiz(quiz.exerciseid)}
            >
              <View style={styles.quizItemIcon}>
                <Icon name="bar-chart" size={30} color="#4CAF50" />
              </View>
              <View style={styles.quizItemDetails}>
                <Text style={styles.quizItemTitle}>{quiz.instructions}</Text>
                <Text style={styles.quizItemDescription}>Categoría ID: {quiz.categoryid}</Text>
              </View>
              <Icon name="arrow-forward-ios" size={20} color="#4CAF50" />
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
