import { router, Link } from "expo-router";
import React, { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRoute, RouteProp } from "@react-navigation/native";
import Avatar from "../../components/Avatar";
import { RootStackParamList } from "../types/RootStackParam";
import { PostgrestError, Session } from "@supabase/supabase-js";
import { Toast } from "toastify-react-native";

type AccountScreenRouteProp = RouteProp<RootStackParamList, "account">;
import { Text, TouchableOpacity, Image, ScrollView } from "react-native";
import {
  BarChart,
  ProgressChart,
  StackedBarChart,
} from "react-native-chart-kit";
import { Tables } from "database.types";
import { UserService } from "services/user";
import { ExerciseService } from "services/exercise";

export default function Index() {
  
  const barData = {
    labels: ["Arrays", "Matemáticas", "Lógica"],
    legend: ["Completado, Sin Completar"],
    data: [
      [30, 70],
      [40, 60],
      [70, 30],
    ], // Datos para cada categoría,
    barColors: ["#28db49", "#ff1e46"],
  };
  const chartConfig = {
    backgroundGradientFrom: "#e6e6fa",
    backgroundGradientTo: "#e6e6fa",
    color: (opacity = 1) => `rgba(63, 191, 127, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // opcional
  };
  const chartConfigBar = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    color: (opacity = 1) => `rgba(63, 191, 127, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    topBarValue: 100,
    fromNumber: 100,
    yAxisLabel: "", // Etiqueta del eje Y
    yAxisInterval: 0, // Ajusta según lo que necesites
    verticalLabelsHeightPercentage: 0.8, // Ajusta el porcentaje de altura de las etiquetas verticales
    // Nuevos parámetros
    getPropsForVerticalLabels: (dx = 10) => 10,
    yAxisMaxValue: 100, // Establecer el valor máximo en 100
    fromZero: true, // Asegúrate de que comience desde 0
  };
  const [selectedTab, setSelectedTab] = useState("home");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Tables<"users"> | null>(null);

  // Obtenemos la sesión de los parámetros de la ruta
  const route = useRoute<AccountScreenRouteProp>();
  const [session, setSession] = useState<Session | null>(
    route.params?.session || null
  );

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    setLoading(true);
    if (!session?.user.id) Toast.error("No user on the session!");

    const { data, error, status } = await supabase
      .from("users")
      .select("*")
      .eq("id", session!.user.id)
      .single();
    if (data) setProfile(data);
    if (error instanceof Error) {
      Toast.error(error.message);
    }
    setLoading(false);
  }
  const [userScore, setUserScore] = useState<number | null>(null); // Cambiado a estado

  useEffect(() => {
    const fetchUserScore = async () => {
      if (session?.user?.id) {
        const { score, error } = await UserService.getUserScoreById(session.user.id);
        if (!error) {
          setUserScore(score); // Actualiza el estado con el score obtenido
        } else {
          // Maneja el error si es necesario
          console.error(error);
        }
      }
    };

    fetchUserScore();
  }, [session]);

  const [userRank, setUserRank] = useState<number | null>(null); // Cambiado a estado

  useEffect(() => {
    const fetchUserRank = async () => {
      if (session?.user?.id) {
        const { rank, error } = await UserService.getUserRankById(session.user.id);
        if (!error) {
          setUserRank(rank); // Actualiza el estado con el score obtenido
        } else {
          // Maneja el error si es necesario
          console.error(error);
        }
      }
    };

    fetchUserRank();
  }, [session]);
  const [userExercises, setExercises] = useState<number | undefined>(undefined);

useEffect(() => {
  const fetchUserexercise = async () => {
    if (session?.user?.id) {
      const { exercises, error } = await UserService.getExercisesByUserId(session.user.id); // Cambiado a exercises
      if (!error) {
        setExercises(exercises?.length); // Actualiza el estado con los ejercicios obtenidos
      } else {
        console.error("Error al obtener los ejercicios del usuario:", error);
      }
    }
  };

  fetchUserexercise();
}, [session?.user?.id]);
  const [userCountAttempt, setUserCountAttempt] = useState<number | null>(null); // Cambiado a estado

useEffect(() => {
  const fetchUserCountAttempt = async () => {
    if (session?.user?.id) {
      const { count, error } = await UserService.getAttemptsCountByUserId(session.user.id); // Cambiado a 'count'
      if (!error) {
        setUserCountAttempt(count); // Actualiza el estado con el conteo obtenido
      } else {
        // Maneja el error si es necesario
        console.error(error);
      }
    }
  };

  fetchUserCountAttempt();
}, [session]);
const [QuizNumberMonth, setQuizNumberMonth] = useState<number | null>(null); // Cambiado a estado

useEffect(() => {
  const fetchQuizNumber = async () => {
    if (session?.user?.id) {
      const { count, error } = await ExerciseService.getCurrentMonthQuizzesCount(); // Cambiado a 'count'
      if (!error) {
        setQuizNumberMonth(count); // Actualiza el estado con el conteo obtenido
      } else {
        // Maneja el error si es necesario
        console.error(error);
      }
    }
  };

  fetchQuizNumber();
}, [session]);
const progressData = {
  labels: ["Programs"],
  data: [
    userCountAttempt !== null && QuizNumberMonth !== null
      ? userCountAttempt / QuizNumberMonth
      : 0,
  ], // Progreso (37/50 programas)
};

  
  async function updateProfile({
    username,
    website,
    avatar_url,
  }: Partial<Tables<"users">>) {
    setLoading(true);
    if (!session?.user) throw new Error("No user on the session!");
    if (!profile) throw new Error("No profile found!");
    const error = await UserService.updateUserProfileById(profile);
    if (error) Toast.error(error.message);
    setLoading(false);
  }

  const handleCreateQuiz = () => {
    console.log("Crear test");
    router.navigate("iniciarQuiz");
  };
  /*
  const handleScanCode = () => {
    console.log('Escanear código');
    router.replace('/(creacionquiz)/qr/scan'); 

  };*/

  if (!profile) {
    return <Text>Cargando...</Text>;
  }
  return (
    <View style={styles.container}>
      <ScrollView
        className=" h-full flex flex-col"
        contentContainerStyle={styles.whiteBackgroundContainer}
      >
        <View style={styles.buttonsContainer}>
          <View className="h-32 w-full">
            <TouchableOpacity style={styles.backButton}>
              <Image
                source={require("../../assets/images/flechaAtras.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex relative w-full bg-white h-auto flex-col  items-center">
          <View className=" absolute  self-center h-20 -top-20 ">
            <Avatar
              size={100}
              url={profile?.avatar_url || ""}
              onUpload={(url: string) => {
                if (profile) {
                  setProfile((prevProfile) => {
                    if (!prevProfile) return prevProfile;
                    return {
                      ...prevProfile,
                      avatar_url: url,
                    };
                  });
                  updateProfile({
                    username: profile.username,
                    website: profile.website,
                    avatar_url: url,
                  });
                }
              }}
            />
          </View>

          <Text className="pt-5 pb-5 text-center text-[#2c2c32] text-2xl font-medium font-['Rubik'] leading-9">
            {profile.username || "Estudiante ITS"}
          </Text>
          <Link asChild href={"modificarUsuario"}>
            <Text>Click here to go to Settings</Text>
          </Link>
          <View className="w-[90%] pl-3 h-36 bg-[#3aa66a] flex flex-row rounded-3xl">
            <View className="w-1/6 flex justify-center items-center h-auto pl-4">
              <AntDesign name="staro" size={32} color="white" />
            </View>
            <View className="w-1/5 flex h-full flex-col items-center">
              <View className="flex flex-col h-1/2 justify-end items-end">
                <Text className="w-full opacity-50 text-center text-white text-xs font-medium font-['Rubik'] uppercase leading-[18px] tracking-wide">
                  Puntos
                </Text>
              </View>
              <View className='flex flex-col h-1/2 justify-start items-end'>
                <Text className="w-8 text-center text-white text-base font-bold font-['Rubik'] leading-normal">{userScore !== null ? userScore : "0"}</Text>
              </View>
            </View>
            <View className="w-[15%] h-full bg-gradient-to-b flex items-end pr-2 justify-center from-white via-white to-white">
              <View className="w-[2px] h-[80%] bg-gradient-to-b from-white  via-white to-slate-200 justify-end align-bottom shadow-white fill-slate-300 bg-slate-200" />
            </View>
            <View className="w-1/6 flex justify-center items-center h-auto pl-2">
              <Feather name="codesandbox" size={32} color="white" />
            </View>
            <View className="w-1/6 flex h-full flex-col items-center">
              <View className="flex flex-col h-1/2 justify-end items-end">
                <Text className="w-full opacity-50 text-center text-white text-xs font-medium font-['Rubik'] uppercase leading-[18px] tracking-wide">
                  Puesto
                </Text>
              </View>
              <View className='flex flex-col h-1/2 justify-start items-end'>
                <Text className="w-8 text-center text-white text-base font-bold font-['Rubik'] leading-normal">#{userRank !== null ? userRank : "0"}</Text>
              </View>
            </View>
          </View>
          <View className=" w-11/12 h-4/5 pt-4">
            <View className="bg-[#e7e5fa] rounded-xl w-full items-center pt-4">
              <View className="flex w-full flex-col justify-center align-middle items-center h-auto pb-5">
                <View className="w-[247px] text-center">
                  <View className="flex w-full flex-row items-center justify-center h-auto">
                    <Text className="text-[#0b082a] text-xl font-medium font-['Rubik'] leading-7">
                      Haz programado {""}
                    </Text>
                    <Text className="text-[#3aa66a] text-xl font-medium font-['Rubik'] leading-7">
                      {userCountAttempt !== null ? userCountAttempt : "0"} 
                    </Text>
                    
                  </View>
                  <View className="flex w-full flex-row items-center justify-center h-auto">
                    <Text className="text-[#0b082a] text-xl font-medium font-['Rubik'] leading-7">
                    
                    </Text>
                    <Text className="text-[#3aa66a] text-xl font-medium font-['Rubik'] leading-7">
                      codigos{" "}
                    </Text>
                    <Text className="text-[#0b082a] text-xl font-medium font-['Rubik'] leading-7">
                      este mes!
                    </Text>
                  </View>
                </View>
              </View>
              <View className="w-full h-52 items-center relative">
                <View className="w-auto absolute justify-center items-center">
                  <ProgressChart
                    data={progressData}
                    width={250}
                    height={180}
                    strokeWidth={12}
                    radius={80}
                    chartConfig={chartConfig}
                    hideLegend={true} // Ocultar la leyenda predeterminada
                  />
                </View>
                <View className="w-full flex flex-column items-center justify-center h-auto top-16">
                  <View className="text-center">
                    <View className="flex flex-row w-full">
                      <View className="align-bottom items-end justify-end h-auto">
                        <Text className="text-[#0b082a] text-[32px] font-bold font-['Rubik'] leading-[48px]">
                        {userScore !== null ? userCountAttempt : "0"} 

                        </Text>
                      </View>
                      <View className="align-bottom items-end justify-end h-auto bottom-2">
                        <Text className="align-bottom text-[#181254]/50 text-base font-medium font-['Rubik'] leading-normal">
                          /{QuizNumberMonth !== null ? QuizNumberMonth : "0"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex flex-row gap-3 align-middle justify-center pb-6">
                <View className="w-[140px] h-24 bg-white rounded-[20px] flex flex-col pl-6 pt-5 pb-5 pr-2">
                  <View className=" flex flex-row h-auto w-full">
                    <Text className="text-[#0b082a] text-[32px] font-bold font-['Rubik'] leading-[48px]">
                    {userExercises !== null ? userExercises : "0"}
                    </Text>
                  </View>
                  <View className=" flex flex-row h-auto w-full">
                    <Text className="text-[#0b082a] text-xs font-normal font-['Rubik'] leading-tight">
                      Quizzes Creados
                    </Text>
                  </View>
                </View>
                <View className="w-[140px] h-24 bg-[#3aa66a] rounded-[20px] flex flex-col pl-6 pt-5 pb-5 pr-2">
                  <View className=" flex flex-row h-auto w-full">
                    <Text className="text-white text-[32px] font-bold font-['Rubik'] leading-[48px]">
                      5
                    </Text>
                  </View>
                  <View className=" flex flex-row h-auto w-full">
                    <Text className="text-white text-xs font-normal font-['Rubik'] leading-tight">
                      Programados
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className=" w-auto h-auto pt-4">
              <View className=" flex align-middle items-center border-2 rounded-3xl border-green-300">
                <StackedBarChart
                  data={barData}
                  width={300}
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix="%"
                  style={styles.bargraph}
                  yAxisInterval={1}
                  fromZero={true}
                  chartConfig={chartConfigBar}
                  hideLegend={true}
                  segments={3}
                  yLabelsOffset={-10}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.quizListContainer}>
          <View style={styles.quizListHeader}>
            <Text style={styles.quizListTitle}>Quiz Recientes</Text>
            <Link asChild href="historialQuiz">
              <TouchableOpacity style={styles.quizListSeeAll}>
                <Text style={styles.quizListSeeAllText}>ver todos</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  bargraph: {
    borderRadius: 20,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 40, // Ajustar para estar más alineado con el encabezado
    zIndex: 2,
  },
  header: {
    flexDirection: "column",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 40,
    marginBottom: 0,
    position: "relative",
  },
  headerBackgroundImage: {
    width: 1000,
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 0,
  },
  backIcon: {
    width: 24, // Ajustar tamaño del icono
    height: 24,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  sunContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 0,
  },
  headerName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
  sunImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  whiteBackgroundContainer: {
    flexGrow: 1,
    backgroundColor: "#3BA76B",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  buttonIcon: {
    marginBottom: 5,
  },
  buttonText: {
    color: "#3BA76B",
    fontSize: 18,
    fontWeight: "bold",
  },
  quizListContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quizListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  quizListTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quizListSeeAll: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  quizListSeeAllText: {
    color: "#007bff",
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
    fontSize: 18,
    fontWeight: "bold",
  },
  quizItemDescription: {
    color: "#666",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
});
