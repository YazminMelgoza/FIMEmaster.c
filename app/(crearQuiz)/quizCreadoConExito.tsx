import { StyleSheet, View, Alert, Text, Pressable, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Button, Input } from "@rneui/themed";
import Avatar from "../../components/Avatar";
import { Tables } from "database.types";
import { router, Link } from "expo-router";
import ConfirmacionOsoSVG from "../../assets/images/confirmacionoso"

import { UserService } from "../../services/user";
import { Toast } from "toastify-react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function ConfirmacionCreacionQuiz() {
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [user, setUser] = useState<Tables<"users"> | null>(null);
    //Obtiene sesion actual
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: sessionData, error: sessionError } =
                    await supabase.auth.getUser();
                if (sessionError) throw sessionError;

                const userId = sessionData?.user?.id;
                if (!userId) throw new Error("No user ID found");

                const { user: fetchedUser, error: fetchError } =
                    await UserService.getUserProfileById(userId);
                if (fetchError) throw fetchError;

                setUser(fetchedUser);
                setUserEmail(sessionData.user.email || "");
            } catch (error) {
                Toast.error("Error fetching user.");
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);
    //Función para hacer el update

    return (
        <View className="bg-[#3aa66a] h-full w-full flex flex-col">
            
            <View className="w-full" style={styles.header}>
                <Image source={require('../../assets/images/imagetextura2.png')} style={styles.backgroundImage} />
                <View className="w-full h-auto flex justify-center items-start pt-6 pl-6">
                
                </View>
            </View>
            <View className="bg-white w-full rounded-t-3xl justify-start w-" style={styles.container}>
                <View className=" flex justify-center items-center pb-4 pt-36">
                    <ConfirmacionOsoSVG />
                    <Text className="text-2xl font-bold text-[#3aa66a] ">¡Se ha creado tu quiz con éxito!</Text>
                </View>
                <Button
                    title="Volver a inicio"
                    onPress={() =>
                        router.navigate("/")
                    }
                    buttonStyle={[styles.button, { backgroundColor: '#3aa66a' }]}
                />
            </View>

        </View>

    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff', // O cualquier color de fondo que prefieras
    }
    , header: {
        paddingBottom:0,
        alignItems: 'center',
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
        width: "100%",
        height: 250,
        position: 'absolute',
    },
    avatar: {
        marginBottom: 20, // Espacio entre el avatar y el resto del contenido
    },
    emailLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        // Asegúrate de que ocupe todo el ancho disponible
        marginBottom: 15, // Espaciado entre los campos de entrada
    },

    button: {
        fontWeight: "bold",
        width: '100%', // Asegúrate de que el botón ocupe todo el ancho
        padding: 15,
        borderRadius: 15,
        marginTop: 10,
    },

    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
        justifyContent: "center",
    }
});