import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type RootStackParamList = {
  Home: undefined;
  HistorialQuiz: undefined;
};

export default function HistorialQuiz() {
  const [quizzes, setQuizzes] = useState([
    {
      title: "Programa Arrays",
      description: "Estructura de Datos",
      icon: "bar-chart",
      color: "#4CAF50",
    },
    {
      title: "Programa Arrays",
      description: "Estructura de Datos",
      icon: "bar-chart",
      color: "#4CAF50",
    },
    {
      title: "Programa calculadora",
      description: "Logica matematica",
      icon: "calculate",
      color: "#4CAF50",
    },
    {
      title: "Programa calculadora",
      description: "Logica matematica",
      icon: "calculate",
      color: "#4CAF50",
    },
    {
      title: "Programa calculadora",
      description: "Logica matematica",
      icon: "calculate",
      color: "#4CAF50",
    },
  ]);

  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <View style={styles.container}>
      {/* Encabezado con imagen de fondo */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/imagetextura2.png")}
          style={styles.backgroundImage}
        />
        <TouchableOpacity style={styles.backButton}>
          <Image
            source={require("../../assets/images/flechaAtras.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Historial</Text>
      </View>

      {/* Fondo blanco */}
      <View style={styles.quizListContainer}>
        <Text style={styles.quizListTitle}>Quiz Recientes</Text>

        {quizzes.map((quiz, index) => (
          <TouchableOpacity key={index} style={styles.quizItem}>
            <View
              style={[styles.quizItemIcon, { backgroundColor: quiz.color }]}
            >
              <Icon name={quiz.icon} size={30} color="#fff" />
            </View>
            <View style={styles.quizItemDetails}>
              <Text style={styles.quizItemTitle}>{quiz.title}</Text>
              <Text style={styles.quizItemDescription}>{quiz.description}</Text>
            </View>
            <Icon name="arrow-forward-ios" size={20} color="#A9A9A9" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Barra inferior de navegación */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setSelectedTab("home")}>
          <Icon
            name="home"
            size={30}
            color={selectedTab === "home" ? "#000" : "#bbb"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("search")}>
          <Icon
            name="search"
            size={30}
            color={selectedTab === "search" ? "#000" : "#bbb"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("stats")}>
          <Icon
            name="bar-chart"
            size={30}
            color={selectedTab === "stats" ? "#000" : "#bbb"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("account")}>
          <Icon
            name="account-circle"
            size={30}
            color={selectedTab === "account" ? "#000" : "#bbb"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    marginBottom: 20,
    position: "relative",
  },
  backgroundImage: {
    width: 1000,
    height: 250,
    position: "absolute",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    left: 30,
    top: 40,
    zIndex: 1,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 65,
  },
  backIcon: {
    position: "absolute",
    left: 20,
    paddingTop: 30,
  },
  quizListContainer: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  quizListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    color: "#000",
  },
  quizItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 22,
    borderRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quizItemIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  quizItemDetails: {
    flex: 1,
  },
  quizItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  quizItemDescription: {
    fontSize: 14,
    color: "#A9A9A9",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
