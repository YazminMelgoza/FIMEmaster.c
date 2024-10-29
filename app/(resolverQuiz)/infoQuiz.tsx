import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { QuizService } from '../../services/quiz';
import { Quiz } from '../../models/quiz';
import ToastManager, { Toast } from 'toastify-react-native';  // Importa ToastManager y Toast

const QuizScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const quizService = new QuizService();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (id) {
      fetchQuiz(Number(id));
    }
  }, [id]);

  const fetchQuiz = async (quizId: number) => {
    const { quiz, error } = await quizService.getQuizById(quizId);
    
    if (error) {
      Toast.error('Error al obtener el quiz.');
      console.error('Error al obtener el quiz:', error);
    } else if (!quiz) {
      Toast.warn('El quiz no existe');
    } else {
      setQuiz(quiz);
      Toast.success("Quiz cargado");
      console.log(quiz);
    }
  };

  const handleAnswerSelect = (lineNumber: number) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [lineNumber]: prevState[lineNumber] !== true,
    }));
  };

  const calculateCompletion = () => {
    const answeredCount = Object.values(selectedAnswers).filter(Boolean).length;
    const totalLines = 4;
    return Math.round((answeredCount / totalLines) * 100);
  };

  return (
    <View style={styles.container}>
      {/* Agrega el ToastManager para mostrar las notificaciones */}
      <ToastManager />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/imagetextura2.png')}
          style={styles.backgroundImage}
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()} 
        >
          <Image source={require('../../assets/images/flechaAtras.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Resolver Quiz</Text>
      </View>

      {/* Mostrar el ID del Quiz */}
      <View style={styles.quizIdContainer}>
        <Text style={styles.quizIdText}>ID del Quiz: {id}</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* White Background Container */}
        <View style={styles.whiteBackgroundContainer}>
          <Image
            source={require('../../assets/images/fondoBlanco.jpg')}
            style={styles.whiteBackgroundImage}
          />
          
          {quiz ? (
            <>
              {/* Code Container */}
              <View style={styles.codeContainer}>
                <Text style={styles.codeHeader}>Código a resolver:</Text>
                <View style={styles.codeBox}>
                  {quiz.wrongcode.split('\n').map((line, index) => (
                    <Text key={index} style={styles.code}>{line}</Text>
                  ))}
                </View>
              </View>
              {/* Output Container */}
              <View style={styles.outputContainer}>
                <Text style={styles.outputHeader}>Output Esperado:</Text>
                <View style={styles.outputBox}>
                  <Text style={styles.output}>{quiz.solutioncode}</Text>
                </View>
              </View>
              {/* Answers Container */}
              <View style={styles.answersContainer}>
                <Text style={styles.answersHeader}>Resuelve:</Text>
                {[1, 4, 6, 8].map((lineNumber) => (
                  <TouchableOpacity
                    key={lineNumber}
                    style={styles.answerOption}
                    onPress={() => handleAnswerSelect(lineNumber)}
                  >
                    <View style={styles.answerBox}>
                      <Image
                        source={require('../../assets/images/fime-logo2.png')}
                        style={styles.answerImage}
                      />
                      <Text style={styles.answerText}>Línea #{lineNumber}</Text>
                      {selectedAnswers[lineNumber] && (
                        <Image
                          source={require('../../assets/images/cancelar.png')}
                          style={styles.answerImage}
                        />
                      )}
                      {!selectedAnswers[lineNumber] && (
                        <Image
                          source={require('../../assets/images/comprobado.png')}
                          style={styles.answerImage}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Completion Container */}
              <View style={styles.completionContainer}>
                <Text style={styles.completionText}>
                  Completado: {calculateCompletion()}%
                </Text>
              </View>
            </>
          ) : (
            // Mostrar mensaje de error cuando no se encuentre el quiz
            <View style={styles.noQuizContainer}>
              <Image
                source={require('../../assets/images/cancelar.png')}
                style={styles.errorIcon}
              />
              <Text style={styles.errorMessage}>No se encontró el quiz solicitado.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  quizIdContainer: {
    padding: 10,
    alignItems: 'center',
  },
  quizIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    paddingTop: 70,
  },
  backgroundImage: {
    width: 1000,
    height: 250,
    position: 'absolute',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    left: 65,
    top: 40,
  },
  whiteBackgroundContainer: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },
  whiteBackgroundImage: {
    position: 'absolute',
    width: "100%",
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  codeContainer: {
    margin: 20,
  },
  codeHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#00622A',
  },
  codeBox: {
    backgroundColor: '#f9fff9',
    padding: 15,
    borderRadius: 10,
  },
  code: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#333',
  },
  outputContainer: {
    margin: 20,
  },
  outputHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#00622A',
  },
  outputBox: {
    backgroundColor: '#f9fff9',
    padding: 15,
    borderRadius: 10,
  },
  output: {
    fontSize: 16,
    color: '#333',
  },
  answersContainer: {
    margin: 20,
  },
  answersHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#00622A',
  },
  answerOption: {
    marginBottom: 10,
  },
  answerBox: {
    backgroundColor: '#f9fff9',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  answerText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  completionContainer: {
    margin: 20,
  },
  completionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00622A',
  },
  
  noQuizContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default QuizScreen;
