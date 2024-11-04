import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, BackHandler  } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { QuestionPayload } from "../types/questionPayload";

type ConfirmarScreenProps = {
    QuestionPayload: QuestionPayload[]; 
    setLoadedQuiz: (loaded: boolean) => void; 
};

export default function ConfirmarQuizScreen({ QuestionPayload, setLoadedQuiz }: ConfirmarScreenProps) {
    const router = useRouter();
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
    return (
        <View>
            {QuestionPayload.length > 0 ? (
                QuestionPayload.map((question, index) => (
                    <Text key={index}>{question.question}</Text> // Asegúrate de que cada pregunta esté en un componente <Text>
                ))
            ) : (
                <Text>No hay preguntas disponibles.</Text>
            )}
          <TouchableOpacity
              onPress={() => setLoadedQuiz(false) 

              }
            >
              <Text>Regresar</Text>
            </TouchableOpacity>
        </View>
    );
}
