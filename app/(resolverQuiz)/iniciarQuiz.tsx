import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router"; // Importa useRouter para la navegación
const QuizScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Imagen de fondo del header */}
        <Image
          source={require("../../assets/images/imagetextura2.png")}
          style={styles.backgroundImage}
        />

        {/* Contenido encima de la imagen: flecha y título */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image source={require("../../assets/images/flechaAtras.png")} />
        </TouchableOpacity>

        <Text style={styles.title}>Iniciar Quiz</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Imagen en blanco de fondo */}
        <View style={styles.whiteBackgroundContainer}>
          <Image
            source={require("../../assets/images/fondoBlanco.jpg")}
            style={styles.whiteBackgroundImage}
          />

          {/* Profile */}
          <View style={styles.profileContainer}>
            <Image
              source={require("../../assets/images/usuario.png")}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>María del Carmen</Text>
            </View>
          </View>

          {/* Start Quiz Button */}
          <View style={styles.startButtons}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push("/quiz")} // Navega a la pantalla de detalles del quiz
            >
              <Icon name="play-circle" size={100} color="#0A8754" />
              <Text style={styles.startText}>Empezar + 10pts</Text>
            </TouchableOpacity>
          </View>

          {/* Quiz Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.quizTitle}>Suma de enteros</Text>
            <Text style={styles.instructions}>Instrucciones:</Text>
            <Text style={styles.instructionsDetails}>
              Analiza el código y resuelve los errores.
            </Text>
            <Text style={styles.category}>Categoría:</Text>
            <Text style={styles.bold}>Lógica</Text>
            <Text style={styles.completed}>
              Completado: <Text style={styles.bold}>50%</Text>{" "}
            </Text>
          </View>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <View style={styles.qrCodeWrapper}>
              <Text style={styles.qrCodeText}>Codigo QR</Text>
              <QRCode value="codigo qr" size={270} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backButton: {
    position: "absolute",
    left: 20,
    paddingTop: 70,
  },
  backgroundImage: {
    width: 1000,
    height: 250,
    position: "absolute",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    left: 65,
    top: 40,
  },
  whiteBackgroundContainer: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },

  whiteBackgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  startButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 15,
  },

  startButton: {
    backgroundColor: "#fff",
    width: "70%",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  startText: {
    color: "#00622A",
    fontSize: 18,

    fontWeight: "bold",
  },
  infoContainer: {
    marginBottom: 10,
    left: 15,
    top: 10,
  },
  quizTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#00622A",
  },
  instructions: {
    fontSize: 16,
    marginTop: 10,
    color: "#00622A",
    fontWeight: "bold",
  },
  instructionsDetails: {
    fontSize: 14,
    marginTop: 5,
    color: "#777777",
  },
  category: {
    marginTop: 10,
    fontSize: 14,
    color: "#00622A",
    fontWeight: "bold",
  },
  completed: {
    fontSize: 14,
    color: "#00622A",
    marginBottom: 10,
    fontWeight: "bold",
  },
  bold: {
    color: "#777777",
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "normal",
  },
  qrContainer: {
    alignItems: "center",
  },

  qrCodeWrapper: {
    backgroundColor: "#fff",
    padding: 45,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: "relative",
  },
  qrCodeText: {
    textAlign: "center",
    // Posicionar  por encima de la parte inferior del código QR
    fontSize: 20,
    color: "#00622A",
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default QuizScreen;
