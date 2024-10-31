import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ExerciseService } from "../../services/exercise";
import { Tables } from "database.types";
import ToastManager, { Toast } from 'toastify-react-native';

const QuizScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Recibe el id del quiz desde los parámetros
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [quiz, setQuiz] = useState<Tables<"exercises"> | null>(null);

  useEffect(() => {
    if (id) {
      fetchQuiz(Number(id));
    }
  }, [id]);

  const fetchQuiz = async (quizId: number) => {
    const { quiz, error } = await ExerciseService.getQuizById(quizId);

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

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setFeedback(option === 'b = 10;' ? '¡Correcto!' : 'Las líneas de código terminan con ;');
  };

  const isCorrect = (option: string) => option === 'b = 10;';

  const options: string[] = [
    'b = 10;',
    'b == 10',
    'b = 10',
    'b. = 10.',
  ];

  return (
    <View style={styles.container}>
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

              <Text style={styles.question}>Selecciona la respuesta</Text>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.selectedOption,
                    selectedOption !== null && !isCorrect(option) && selectedOption === option && styles.incorrectOption
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}

              {selectedOption && (
                <View style={styles.feedbackContainer}>
                  <Text style={styles.feedbackLabel}>Retroalimentación:</Text>
                  <Text style={[styles.feedback, isCorrect(selectedOption) ? styles.correctFeedback : styles.incorrectFeedback]}>
                    {feedback}
                  </Text>
                </View>
              )}

              {selectedOption === 'b = 10;' && (
                <View style={styles.correctContainer}>
                  <Text style={styles.correctText}>¡CORRECTO!</Text>
                  <TouchableOpacity style={styles.continueButtonC} onPress={() => {/* Handle continue action */}}>
                    <Text style={styles.continueTextC}>CONTINUAR</Text>
                  </TouchableOpacity>
                </View>
              )}

              {selectedOption && !isCorrect(selectedOption) && (
                <View style={styles.incorrectContainer}>
                  <Text style={styles.incorrectText}>INCORRECTO</Text>
                  <TouchableOpacity style={styles.continueButtonI} onPress={() => {/* Handle retry action */}}>
                    <Text style={styles.continueTextI}>VOLVER A INTENTAR</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  lineNumber: {
    fontSize: 18,
    marginTop: 10,
    color: '#00622A',
    fontWeight: 'bold', 
  },
  line: {
    fontSize: 18,
    marginTop: 10,
    color: '#777777',
    
  },
  lineText: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00622A', 
    marginVertical: 10,
  },
  optionButton: {
    backgroundColor: '#F9FFF9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#99C97C',
    borderColor: '#2A9D8F',
  },
  incorrectOption: {
    backgroundColor: '#FE6161', // Color rojo para respuestas incorrectas
    borderColor: '#FF0000',
  },
  optionText: {
    fontSize: 16,
    color: '#',
  },
  feedbackContainer: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
  },
  feedbackLabel: {
    fontSize: 16,
    color: '#00622A',
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 16,
    color: '#000',
  },
  correctContainer: {
    backgroundColor: '#CFFAC8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    
  },
  correctText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00622A',
    marginBottom: 10,
  },
  incorrectContainer: {
    backgroundColor: '#FE616180',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  incorrectText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8F2424',
    marginBottom: 10,
  },
  continueButtonC: {
    backgroundColor: '#179659',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width:'100%'
  },
  continueButtonI: {
    backgroundColor: '#FE6161',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width:'100%'
  },
  continueTextC: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueTextI: {  
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold', 

  },
  correctFeedback: {
    color: '#2D2D2D', // Estilo para el feedback correcto
    fontWeight:'bold',
  },
  incorrectFeedback: {
    color: '#2D2D2D', // Estilo para el feedback incorrecto
    fontWeight:'bold',
  },

});



export default QuizScreen;