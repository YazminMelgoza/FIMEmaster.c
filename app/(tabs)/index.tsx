import { router, Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { NativeWindStyleSheet } from "nativewind";
import { supabase } from "../../lib/supabase";
import ToastManager, { Toast } from 'toastify-react-native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AttemptService } from 'services/attempt';
import { UserService } from "services/user";
import Avatar from '../../components/Avatar';
import AvatarReadOnly from '../../components/AvatarReadOnly';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Index() {
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const [attempts, setAttempts] = useState<any[]>([]);
  const [exerciseTitles, setExerciseTitles] = useState<{ [key: number]: string | null }>({});
  const [userId, setUserId] = useState<string>("");
  const [fullName, setFullName] = useState<string>("Usuario");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        const userId = data.user.id;
        setUserId(userId);

        const { user, error: profileError } = await UserService.getUserProfileById(userId);
        if (profileError || !user) {
          console.error("Error al obtener el perfil del usuario:", profileError);
          Toast.error("Error al obtener el perfil del usuario.");
        } else {
          const nameParts = [user.firstname, user.lastname].filter(Boolean);
          const fullName = nameParts.join(" ") || "Usuario";
          setFullName(fullName);
          if (user.avatar_url) {
            setAvatarUrl(user.avatar_url);
            console.log("Avatar URL:", user.avatar_url); // Verifica la URL aquí
          }
          //Toast.success("Nombre del usuario y avatar cargados.");
        }

        fetchAttempts(userId);
      } else {
        console.error("Error fetching user:", error);
        Toast.error("Usuario no encontrado.");
      }
    };
    fetchUser();
  }, []);

  const fetchAttempts = async (userId: string) => {
    const { data, error } = await AttemptService.getLastFourAttemptsByUserId(userId);
    if (error) {
      console.error("Error fetching attempts:", error.message);
      Toast.error("Error cargando quiz recientes.");
    } else if (!data || data.length === 0) {
      Toast.warn("No attempts found.");
    } else {
      setAttempts(data);
      //Toast.success("Attempts loaded.");
      data.forEach(async (attempt) => {
        console.log("Attempted at:", new Date(attempt.attemptedat).toUTCString());
        const title = await fetchExerciseTitle(attempt.exerciseid);
        setExerciseTitles(prevTitles => ({
          ...prevTitles,
          [attempt.exerciseid]: title,
        }));
      });
    }
  };

  const fetchExerciseTitle = async (exerciseId: number) => {
    const { data, error } = await supabase
      .from('exercises')
      .select('title')
      .eq('exerciseid', exerciseId)
      .single();
    if (error) {
      console.error("Error fetching exercise title:", error.message);
      return null;
    }
    return data.title;
  };

  const handleCreateQuiz = (quizId: number) => {
    console.log("Create quiz with ID:", quizId);
    router.push(`iniciarQuiz?id=${quizId}`);
  };

  return (
    <View style={styles.container}>
      <ToastManager />
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/imagetextura2.png')}
          style={styles.headerBackgroundImage}
        />
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <View style={styles.sunContainer}>
              <Image
                source={require('../../assets/images/sun.png')}
                style={styles.sunImage}
              />
              <Text style={styles.headerText}>BUENOS DÍAS</Text>
            </View>
            <Text style={styles.headerName}>{fullName}</Text>
          </View>

          {/* Mostrar solo la imagen del avatar */}
          {avatarUrl && (
            <AvatarReadOnly url={avatarUrl} size={50} showUploadButton={false} onUpload={() => {}} /> )
          }
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.whiteBackgroundContainer}>
        <View style={styles.buttonsContainer}>
          <Link asChild href="scan">
            <TouchableOpacity style={styles.button}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="qr-code" size={50} color="#3BA76B" />
                <Text style={styles.buttonText}>Escanear Código</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <Link asChild href="creacionQuiz">
            <TouchableOpacity style={styles.button}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="code" size={50} color="#3BA76B" />
                <Text style={styles.buttonText}> Crear test</Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.quizListContainer}>
          <View style={styles.quizListHeader}>
            <Text style={styles.quizListTitle}>Quiz Recientes</Text>
            <Link asChild href="historialquiz">
              <TouchableOpacity style={styles.quizListSeeAll}>
                <Text style={styles.quizListSeeAllText}>ver todos</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {attempts.map((attempt) => (
            <TouchableOpacity
              key={attempt.attemptid}
              style={[styles.quizItem, { backgroundColor: '#fff' }]}
              onPress={() => handleCreateQuiz(attempt.exerciseid)}
            >
              <View style={styles.quizItemIcon}>
                <Text style={styles.quizItemScoreLabel}>Puntaje</Text>
                <Text style={styles.quizItemScore}>{attempt.score ?? 'N/A'}</Text>
              </View>
              <View style={styles.quizItemDetails}>
                <Text style={styles.quizItemTitle}>
                  {exerciseTitles[attempt.exerciseid] || `Intento ${attempt.attemptid}`}
                </Text>
                <Text style={styles.quizItemDescription}>
                  Fecha: {formatDate(attempt.attemptedat)}
                </Text>
              </View>
              <Icon name="arrow-forward-ios" size={20} color="#4CAF50" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'column', 
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 40,
    marginBottom: 0,
    position: 'relative', 
  },
  headerBackgroundImage: {
    width: 1000,
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40, 
  },
  headerTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10, 
  },
  sunContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 0,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    overflow: 'hidden',
  },
  headerName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  buttonIcon: {
    marginBottom: 5,
  },
  buttonText: {
    color: '#3BA76B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizListContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quizListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  quizListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quizListSeeAll: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  quizListSeeAllText: {
    color: '#007bff',
  },
  quizItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quizItemIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  quizItemDetails: {
    flex: 1,
  },
  quizItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizItemDescription: {
    color: '#666',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  quizItemScoreLabel: {
    fontSize: 12,
    color: '#4CAF50',
  },
  quizItemScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  
  
});