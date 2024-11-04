import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, BackHandler  } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { QuestionPayload } from "../types/questionPayload";
import { Tables } from "database.types";;
import QuizScreen from './resolverQuizPreview';
import { ExerciseService } from "../../services/exercise";
import ToastManager, { Toast } from 'toastify-react-native';


type ConfirmarTestScreenProps = {
  QuestionPayload: QuestionPayload[]; 
  infoEjercicio: Tables<"exercises">;
  authorName: string;
  setLoadedQuiz: (loaded: boolean) => void; 
};

export default function ConfirmarTestScreen({ QuestionPayload,infoEjercicio,authorName, setLoadedQuiz }: ConfirmarTestScreenProps)  {
  const router = useRouter();
  const [previewQuiz, setPreviewQuiz]  = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState<QuestionPayload>();
  //Función para prevenir el ir para atrás
  useEffect(() => {
    const handleBackPress = () => {
        setLoadedQuiz(false);
        return true; 
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
        subscription.remove();
    };
  }, [setLoadedQuiz]);

  async function handleCreateExercise()
  {
    try
    {
      const { data, error } = await ExerciseService.createExercise(infoEjercicio,QuestionPayload);
      // Manejo de errores
      if (error) {
        console.error("Error al crear el ejercicio:", error.message);
        Toast.warn('Hubo un error al crear el ejercicio. Revisa la consola para más detalles.');
        return;
      }
      // Si no hay errores, puedes procesar los datos
      console.log("Ejercicio creado exitosamente:", data);
      Toast.success("Ejercicio creado exitosamente");
      router.navigate("/");

    }catch(err) 
    {
      console.error("Error inesperado:", err);
      Toast.warn("Ocurrió un error inesperado. Revisa la consola para más detalles.");
    }

   
  };

  if(previewQuiz == true)
  {
    return(
      <QuizScreen
      infoQuestion={previewQuestion}
      codeToSolve={infoEjercicio.wrongcode}
      setPreviewQuiz= {setPreviewQuiz}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/imagetextura2.png")}
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setLoadedQuiz(false)}
        >
          <Image source={require("../../assets/images/flechaAtras.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>Confirmar Quiz</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.whiteBackgroundContainer}>
          <Image
            source={require("../../assets/images/fondoBlanco.jpg")}
            style={styles.whiteBackgroundImage}
          />

          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <Image
              source={require("../../assets/images/usuario.png")}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{authorName}</Text>
            </View>
          </View>


          {/* Quiz Info Section */}
          <View style={styles.infoContainer}>
            <Text style={styles.quizTitle}>{infoEjercicio.title}</Text>
            <Text style={styles.instructions}>Instrucciones:</Text>
            <Text style={styles.instructionsDetails}>
              {infoEjercicio.instructions}
            </Text>
            <Text style={styles.category}>Categoría:</Text>
            <Text style={styles.categoryUpdate}>{infoEjercicio.categoryid}</Text>
          </View>

          {/* Code Section */}
          <View style={styles.codeContainer}>
            <Text style={styles.codeHeader}>Código a resolver:</Text>
            <View style={styles.codeBox}>
              <Text style={styles.code}>
                {infoEjercicio.wrongcode}
              </Text>
            </View>
          </View>

          {/* Output Section */}
          <View style={styles.outputContainer}>
            <Text style={styles.outputHeader}>Numero de preguntas:</Text>
            <View style={styles.outputBox}>
              <Text style={styles.output}>{QuestionPayload.length }</Text>
            </View>
          </View>

          {/* Answer Section */}
          <View style={styles.answersContainer}>
            <Text style={styles.answersHeader}>Resuelve:</Text>
            {QuestionPayload.length > 0 ? (
                QuestionPayload.map((question, index) => (
                  <TouchableOpacity key={index} style={styles.answerOption}
                    onPress={() => 
                      {
                        console.log("presionao: " + previewQuiz);
                        setPreviewQuestion(question);
                        setPreviewQuiz(true);
                      }
                    }
                  >
                    <View style={styles.answerBox}>
                      <Image
                        source={require("../../assets/images/fime-logo2.png")}
                        style={styles.answerImage}
                      />
                      <Text style={styles.answerText}>Línea #{question.lineStart}</Text>
                    </View>
                  </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.answerText} >No hay preguntas disponibles.</Text>
            )}

          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.regresarButton}
              onPress={() => setLoadedQuiz(false) }
            >
              <Text style={styles.regresarButtonText}>Regresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finalizarButton}
             onPress={handleCreateExercise}
             >
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
    fontSize: 20,
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
  infoContainer: {
    margin: 20,
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
    color: "#000",
  },
  category: {
    fontSize: 14,
    color: "#00622A",
    fontWeight: "bold",
  },
  categoryUpdate: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  codeContainer: {
    margin: 20,
  },
  codeHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00622A",
  },
  codeBox: {
    backgroundColor: "#F9FFF9",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  code: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  outputContainer: {
    margin: 20,
  },
  outputHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00622A",
  },
  outputBox: {
    backgroundColor: "#F9FFF9",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  output: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  answersContainer: {
    margin: 20,
  },
  answersHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00622A",
  },
  answerOption: {
    marginBottom: 15,
  },
  answerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FFF9",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
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
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  regresarButton: {
    backgroundColor: "#F3FFF3",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  finalizarButton: {
    backgroundColor: "#198155",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  regresarButtonText: {
    textAlign: "center",
    color: "#198155",
    fontWeight: "bold",
  },
  finalizarButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});


