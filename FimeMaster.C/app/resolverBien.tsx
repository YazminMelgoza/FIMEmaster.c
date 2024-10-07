import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const QuizScreen = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const codeSnippet = `
  #include <stdio.h>
  int main()
  {
    int a, b, c;
    a = 5;
    b = 10;
    c = a + b;
    printf("El resultado es: %d", c);
    return 0;
  }
  `;

  const options: string[] = [
    'b = 10;',
    'b == 10',
    'b = 10',
    'b. = 10.',
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setFeedback(option === 'b = 10;' ? '¡Correcto!' : 'Las líneas de código terminan con ;');
  };

  const isCorrect = (option: string) => option === 'b = 10;';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/imagetextura2.png')} 
          style={styles.headerBackgroundImage}
        />
        <TouchableOpacity style={styles.backButton}>
          <Image source={require('@/assets/images/flechaAtras.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Resolver Error</Text>
      </View>

      {/* Fondo blanco ajustado */}
      <ScrollView contentContainerStyle={styles.whiteBackgroundContainer}>
        <Text style={styles.codeHeader}>Código a resolver:</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>{codeSnippet}</Text>
        </View>
        <Text style={styles.lineNumber}>Línea #6:</Text>
        <Text style={styles.line}></Text>
        <Text style={styles.lineText}>b = 10</Text>

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
            <TouchableOpacity style={styles.continueButtonC}>
              <Text style={styles.continueTextC}>CONTINUAR</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedOption && !isCorrect(selectedOption) && (
          <View style={styles.incorrectContainer}>
            <Text style={styles.incorrectText}>INCORRECTO</Text>
            <TouchableOpacity style={styles.continueButtonI}>
              <Text style={styles.continueTextI}>VOLVER A INTENTAR</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF5',
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
    backgroundColor: '#fff', // Fondo del header
  },
  headerBackgroundImage: {
    width: 1000,
    height: 250,
    position: 'absolute',
    
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    left: 65,
    top:30,
  },
  whiteBackgroundContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  codeHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#00622A',
  },
  codeBox: {
    backgroundColor: '#f9fff9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#333',
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