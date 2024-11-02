import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Tables } from "database.types";

const QuizScreen = () => {
  const router = useRouter();
  const { jsonExercise } = useLocalSearchParams();
  const ObjExercise = jsonExercise ? JSON.parse(jsonExercise as string) as Tables<"exercises"> : null;


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/imagetextura2.png')}
          style={styles.backgroundImage}
        />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('../../assets/images/flechaAtras.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Confirmar Quiz</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.whiteBackgroundContainer}>
          <Image
            source={require('../../assets/images/fondoBlanco.jpg')}
            style={styles.whiteBackgroundImage}
          />

          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <Image
              source={require('../../assets/images/usuario.png')}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>María del Carmen</Text>
            </View>
          </View>

          {/* Quiz Info Section */}
          <View style={styles.infoContainer}>
            <Text style={styles.quizTitle}>Suma de enteros</Text>
            <Text style={styles.instructions}>Instrucciones:</Text>
            <Text style={styles.instructionsDetails}>
              {ObjExercise?.instructions}
            </Text>
            <Text style={styles.category}>Categoría:</Text>
            <Text style={styles.categoryUpdate}>Lógica</Text>
          </View>

          {/* Code Section */}
          <View style={styles.codeContainer}>
            <Text style={styles.codeHeader}>Código a resolver:</Text>
            <View style={styles.codeBox}>
              <Text style={styles.code}>#include {'<'}stdio.h{'>'}</Text>
              <Text style={styles.code}>int main()</Text>
              <Text style={styles.code}>{'{'}</Text>
              <Text style={styles.code}> int a, d, c;</Text>
              <Text style={styles.code}> a = 5;</Text>
              <Text style={styles.code}> b = 10;</Text>
              <Text style={styles.code}> c = a + b;</Text>
              <Text style={styles.code}> printf("El resultado es: %d", c);</Text>
              <Text style={styles.code}> return 0;</Text>
              <Text style={styles.code}>{'}'}</Text>
            </View>
          </View>

          {/* Output Section */}
          <View style={styles.outputContainer}>
            <Text style={styles.outputHeader}>Numero de preguntas:</Text>
            <View style={styles.outputBox}>
              <Text style={styles.output}>5</Text>
            </View>
          </View>

          {/* Answer Section */}
          <View style={styles.answersContainer}>
            <Text style={styles.answersHeader}>Resuelve:</Text>
            {[1, 4, 6, 8].map((lineNumber) => (
              <TouchableOpacity
                key={lineNumber}
                style={styles.answerOption}
              >
                <View style={styles.answerBox}>
                  <Image
                    source={require('../../assets/images/fime-logo2.png')}
                    style={styles.answerImage}
                  />
                  <Text style={styles.answerText}>Línea #{lineNumber}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.regresarButton} onPress={() => router.back()}>
              <Text style={styles.regresarButtonText}>Regresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finalizarButton}>
              <Text style={styles.finalizarButtonText}>Finalizar</Text>
            </TouchableOpacity>
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoContainer: {
    margin: 20,
  },
  quizTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#00622A',
  },
  instructions: {
    fontSize: 16,
    marginTop: 10,
    color: '#00622A',
    fontWeight: 'bold',
  },
  instructionsDetails: {
    fontSize: 14,
    marginTop: 5,
    color: '#000',
  },
  category: {
    fontSize: 14,
    color: '#00622A',
    fontWeight: 'bold',
  },
  categoryUpdate: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    
  },
  bold: {
    fontWeight: 'bold',
  },
  codeContainer: {
    margin: 20,
    
  },
  codeHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00622A',
  },
  codeBox: {
    backgroundColor: '#F9FFF9', 
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    
  },
  code: {
   
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  outputContainer: {
    margin: 20,
  },
  outputHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00622A',
  },
  outputBox: {
    backgroundColor: '#F9FFF9', 
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  output: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  answersContainer: {
    margin: 20,
  },
  answersHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00622A',
  },
  answerOption: {
    marginBottom: 15,
  },
  answerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FFF9',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 3, 
  },
  answerImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  answerText: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  regresarButton: {
    backgroundColor: '#F3FFF3',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  finalizarButton: {
    backgroundColor: '#198155',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  regresarButtonText: {
    textAlign: 'center',
    color: '#198155', 
    fontWeight: 'bold',
  },
  finalizarButtonText: {
    textAlign: 'center',
    color: '#fff', 
    fontWeight: 'bold',
  },
});

export default QuizScreen;
