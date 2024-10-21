import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';


const QuizScreen = () => {
  const router = useRouter();
  
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: boolean | null }>({
    1: true,
    4: false,
    6: null,
    8: null,
  });

  const handleAnswerSelect = (lineNumber: number) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [lineNumber]: prevState[lineNumber] === null ? true : null, 
    }));
  };

  const calculateCompletion = () => {
    const totalAnswers = Object.keys(selectedAnswers).length;
    const answeredCount = Object.values(selectedAnswers).filter((answer) => answer !== null).length;
    return Math.round((answeredCount / totalAnswers) * 100);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/imagetextura2.png')}
          style={styles.backgroundImage}
        />
        <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()} // Utiliza router.back() para regresar
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

          {/* Code Container */}
          <View style={styles.codeContainer}>
            <Text style={styles.codeHeader}>Código a resolver:</Text>
            <View style={styles.codeBox}>
              <Text style={styles.code}>#include {'<'}stdio.h{'>'}</Text>
              <Text style={styles.code}>int main()</Text>
              <Text style={styles.code}>{'}'}</Text>
              <Text style={styles.code}> int a, d, c;</Text>
              <Text style={styles.code}> a = 5;</Text>
              <Text style={styles.code}> b = 10</Text>
              <Text style={styles.code}> c = a + b;</Text>
              <Text style={styles.code}> printf("El resultado es: %d", c);</Text>
              <Text style={styles.code}> return 0;</Text>
              <Text style={styles.code}>{'}'}</Text>
            </View>
          </View>

          {/* Output Container */}
          <View style={styles.outputContainer}>
            <Text style={styles.outputHeader}>Output Esperado:</Text>
            <View style={styles.outputBox}>
              <Text style={styles.output}>El resultado es 15</Text>
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
                  {selectedAnswers[lineNumber] === true && (
                     <Image
                     source={require('../../assets/images/cancelar.png')} 
                      style={styles.answerImage}
                   />
                  )}
                  {selectedAnswers[lineNumber] === false && (
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
    resizeMode: 'contain', // Cambia a 'cover' o 'stretch' si es necesario
    marginRight: 10,
  },
  answerText: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Permite que el texto ocupe el espacio disponible
  },
  correctIcon: {
    color: 'green',
  },
  incorrectIcon: {
    color: 'red',
  },
  completionContainer: {
    margin: 20,
  },
  completionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00622A',
  },
});

export default QuizScreen;