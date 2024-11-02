import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ExerciseService } from "../../services/exercise";
import { QuestionService } from "../../services/question";
import { AnswerService } from "../../services/answer"; // Import AnswerService
import { Tables } from "database.types";
import ToastManager, { Toast } from 'toastify-react-native';

const QuizScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Recibe el id del quiz desde los parámetros
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>(''); 
  const [quiz, setQuiz] = useState<Tables<"exercises"> | null>(null); 
  const [questions, setQuestions] = useState<Tables<"questions">[]>([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [answers, setAnswers] = useState<Tables<"answers">[]>([]); // State to store answers

  useEffect(() => {
    if (id) {
      fetchQuizAndQuestions(Number(id));
    }
  }, [id]);

  const fetchQuizAndQuestions = async (quizId: number) => {
    const { exercise, error: quizError } = await ExerciseService.getExerciseById(quizId);
    if (quizError || !quiz) {
      Toast.warn('El quiz no existe o hubo un error.');
      console.error('Error al obtener el quiz:', quizError);
      return;
    }
    setQuiz(quiz);
    Toast.success("Quiz cargado");

    const { questions, error: questionError } = await QuestionService.getAllQuestionsByExerciseId(quizId);
    if (questionError || !questions) {
      Toast.warn('No se pudieron cargar las preguntas.');
      console.error('Error al obtener preguntas:', questionError);
    } else {
      setQuestions(questions);
      Toast.success("Preguntas cargadas");
      console.log(questions);
      loadAnswersForQuestion(questions[0].questionid); // Load answers for the first question
    }
  };

  const loadAnswersForQuestion = async (questionId: number) => {
    const { answers, error } = await AnswerService.getAllAnswersByQuestionId(questionId);
    if (error) {
      Toast.warn('No se pudieron cargar las respuestas.');
      console.error('Error al obtener respuestas:', error);
      setAnswers([]);
    } else {
      setAnswers(answers || []);
      console.log(`Respuestas para la pregunta ${questionId}:`, answers);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    const selectedAnswer = answers.find(answer => answer.answer === option);
    if (selectedAnswer) {
      setFeedback(selectedAnswer.iscorrect ? '¡Correcto!' : 'Las líneas de código terminan con ;');
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setFeedback('');
  };

  const handleContinue = () => {
    setFeedback('');
    setSelectedOption(null);
    // Avanzar a la siguiente pregunta si hay más
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      loadAnswersForQuestion(questions[nextIndex].questionid); // Load answers for the next question
    } else {
      // Mostrar mensaje de finalización o navegar
      Toast.success("¡Quiz completado!");
      router.navigate('/Storage');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* White Background Container */}
        <View style={styles.whiteBackgroundContainer}>
          <Image
            source={require('../../assets/images/fondoBlanco.jpg')}
            style={styles.whiteBackgroundImage}
          />
          {quiz && questions.length > 0 && (
            <>
              {/* Code Container */}
              <View style={styles.codeContainer}>
                <Text style={styles.codeHeader}>Pregunta {currentQuestionIndex + 1}:</Text>
                {currentQuestion ? (
                  <View style={styles.codeBox}>
                    <Text style={styles.code}>{currentQuestion.question}</Text>
                  </View>
                ) : (
                  <Text>No hay preguntas disponibles para este quiz.</Text>
                )}
                <Text style={styles.codeHeader}>Código a resolver:</Text>
                <View style={styles.codeBox}>
                  {quiz.wrongcode.split('\n').map((line, index) => (
                    <Text key={index} style={styles.code}>{line}</Text>
                  ))}
                </View>
              </View>
              <Text style={styles.question}>Selecciona la respuesta</Text>
              {answers.map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === answer.answer && styles.selectedOption,
                    selectedOption !== null && !answer.iscorrect && selectedOption === answer.answer && styles.incorrectOption
                  ]}
                  onPress={() => handleOptionSelect(answer.answer)}
                >
                  <Text style={styles.optionText}>{answer.answer}</Text>
                </TouchableOpacity>
              ))}
              {selectedOption && (
                <View style={styles.feedbackContainer}>
                  <Text style={styles.feedbackLabel}>Retroalimentación:</Text>
                  <Text style={[styles.feedback, answers.find(answer => answer.answer === selectedOption)?.iscorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
                    {feedback}
                  </Text>
                </View>
              )}
              {selectedOption && answers.find(answer => answer.answer === selectedOption)?.iscorrect && (
                <View style={styles.correctContainer}>
                   <Text style={styles.correctText}>¡CORRECTO!</Text>
                <TouchableOpacity style={styles.continueButtonC} onPress={handleContinue}>
                  <Text style={styles.continueTextC}>CONTINUAR</Text>
                </TouchableOpacity>
                </View>
              )}
              {selectedOption && !answers.find(answer => answer.answer === selectedOption)?.iscorrect && (
                <View style={styles.incorrectContainer}>
                   <Text style={styles.incorrectText}>Incorrecto</Text>
                <TouchableOpacity style={styles.continueButtonI} onPress={handleRetry}>
                  <Text style={styles.continueTextI}>VOLVER A INTENTAR</Text>
                </TouchableOpacity>
                </View>
              )}
            </>
          )}
          {!quiz && (
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