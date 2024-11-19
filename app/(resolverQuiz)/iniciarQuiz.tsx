import React, { useEffect, useState } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { ExerciseService } from "../../services/exercise";
import { UserService } from "services/user";
import { Tables } from "database.types";
import ToastManager, { Toast } from "toastify-react-native";
import { CircularProgress } from "../../components/ProgressElipse";
import AvatarReadOnly from "../../components/AvatarReadOnly";
import LoadingIcon from "../../components/loadingIcon";
import { CategoryService } from "../../services/categories";
import * as Clipboard from "expo-clipboard";

const QuizScreen = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [quiz, setQuiz] = useState<Tables<"exercises"> | null>(null);
  const [author, setAuthor] = useState<Tables<"users"> | null>(null);
  const [category, setCategory] = useState<Tables<"categories"> | null>(null);
  // Define la URL predeterminada

  useEffect(() => {
    if (id) {
      fetchQuiz(Number(id));
    }
  }, [id]);

  const fetchQuiz = async (quizId: number) => {
    setLoading(true);
    const { exercise, error } = await ExerciseService.getExerciseById(quizId);
    if (error) {
      Toast.error("Error al obtener el quiz.");
      console.error("Error al obtener el quiz:", error);
    } else if (!exercise) {
      Toast.warn("El quiz no existe");
    } else {
      setQuiz(exercise);
      const { user, error: errorUser } = await UserService.getUserProfileById(
        exercise.authorId
      );
      const { data: categoryData, error: categoryError } =
        await CategoryService.getCategoryById(exercise.categoryid || 1);
      if (errorUser) {
      } else if (!user) {
      } else {
        setAuthor(user);
      }
      if (categoryData) {
        setCategory(categoryData);
      }
      //Toast.success("Quiz cargado");
      console.log(exercise);
    }
    setLoading(false);
  };

  const encodeBase64 = (data: string) => {
    try {
      const decodedData = btoa(data);
      return decodedData;
    } catch (error) {
      console.error("Error decodificando Base64: ", error);
      return null;
    }
  };

  // Function to copy Base64 code to clipboard
  const copyToClipboard = async (base64Data: string) => {
    await Clipboard.setStringAsync(base64Data); // Usa setStringAsync en lugar de setString
    Toast.success("Código copiado al portapapeles");
  };
  /*
  if(loading)
  {
    return( 
      <View style={styles.container}>
        <CircularProgress/>
      </View>);
  }*/
  const base64Code = encodeBase64(Array.isArray(id) ? id.join(",") : id) || "";
  return (
    <View style={styles.container}>
      <ToastManager />
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/imagetextura2.png")}
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image source={require("../../assets/images/flechaAtras.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>Iniciar Quiz</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.whiteBackgroundContainer}>
          <Image
            source={require("../../assets/images/fondoBlanco.jpg")}
            style={styles.whiteBackgroundImage}
          />
          {loading ? (
            <LoadingIcon />
          ) : (
            <View>
              <View style={styles.profileContainer}>
                {author?.avatar_url && (
                  <AvatarReadOnly
                    url={
                      author?.avatar_url ||
                      'require("../../assets/userplaceholder.jpg")'
                    }
                    size={40}
                    showUploadButton={false}
                    onUpload={() => {}}
                  />
                )}
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>
                    {author?.firstname || "No Definido"} {author?.lastname}
                  </Text>
                </View>
              </View>
              <View style={styles.startButtons}>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => router.push(`/resolverQuiz?id=${id}`)} // Pass the quiz ID to resolverQuiz
                >
                  <Icon name="play-circle" size={100} color="#0A8754" />
                  <Text style={styles.startText}>Empezar + 10pts</Text>
                </TouchableOpacity>
              </View>
              {quiz && (
                <View style={styles.infoContainer}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                  <Text style={styles.instructions}>Instrucciones:</Text>
                  <Text style={styles.instructionsDetails}>
                    {quiz.instructions}
                  </Text>
                  <Text style={styles.category}>Categoría:</Text>
                  <Text style={styles.bold}>{category?.name}</Text>
                  <Text style={styles.completed}>
                    Cantidad de preguntas:{" "}
                    <Text style={styles.bold}>{quiz.questionsnumber}</Text>
                  </Text>
                </View>
              )}
              {quiz ? (
                <View style={styles.qrContainer}>
                  <View style={styles.qrCodeWrapper}>
                    <Text style={styles.qrCodeText}>Código QR</Text>
                    <QRCode value={base64Code} size={270} />
                    <TouchableOpacity
                      style={styles.copyButton}
                      onPress={() => copyToClipboard(base64Code)}
                    >
                      <Text style={styles.copyButtonText}>
                        Copiar Código QR
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.qrContainer}>
                  <View style={styles.qrCodeWrapper}>
                    <Text style={styles.qrCodeText}>
                      Código QR No disponible
                    </Text>
                  </View>
                </View>
              )}
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
    marginLeft: 10,
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
  copyButton: {
    backgroundColor: "#34C759",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default QuizScreen;
