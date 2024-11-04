import { StyleSheet, View, Alert, Text, Pressable, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Button, Input } from "@rneui/themed";
import Avatar from "../../components/Avatar";
import { Tables } from "database.types";
import { router, Link } from "expo-router";

import { UserService } from "../../services/user";
import { Toast } from "toastify-react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function Account() {
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
    const updateProfile = async (updatedUser: Tables<"users">) => {
        try {
            setLoading(true);
            if (!updatedUser.id) throw new Error("No user on the session!");

            const error = await UserService.updateUserProfileById({
                ...updatedUser,
            });

            if (error) throw error;

            Alert.alert("Profile updated successfully");
        } catch (error) {
            Alert.alert(
                error instanceof Error ? error.message : "Error updating profile."
            );
        } finally {
            setLoading(false);
        }
    };
    //Función para update el estado del objeto user
    if (loading) {
        return <View style={styles.container}>
            <Text>Loading...</Text>
        </View>;
    }

    function updateUserState(user: Partial<Tables<"users">>) {
        setUser((prevUser) => ({
            ...prevUser!,
            ...user,
        }));
    }
    return (
        <View className="bg-[#3aa66a] h-full w-full flex flex-col">
            <View className="w-full h-auto pl-8 pt-10">
            <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="chevron-left" size={35} color="white" onPress={()=> router.back()} />
            </TouchableOpacity>

            </View>
            <View className="w-full h-auto flex relative justify-center align-bottom items-center ">

                <Avatar
                    size={90}
                    url={user?.avatar_url || ""}
                    onUpload={(url) => updateUserState({ avatar_url: url })}
                />
            </View>
            <View className="bg-white rounded-t-3xl" style={styles.container}>


                <Text style={styles.emailLabel}>Email</Text>
                <Input
                    value={userEmail}
                    disabled
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                />

                <Input
                    label="First Name"
                    value={user?.firstname || ""}
                    onChangeText={(text) => updateUserState({ firstname: text })}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                />

                <Input
                    label="Last Name"
                    value={user?.lastname || ""}
                    onChangeText={(text) => updateUserState({ lastname: text })}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                />

                <Input
                    label="Middle Name"
                    value={user?.middlename || ""}
                    onChangeText={(text) => updateUserState({ middlename: text })}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                />

                <View className="w-full h-auto flex">

                    <Button
                        title={loading ? "Loading..." : "Update"}
                        onPress={() => updateProfile(user!)}
                        disabled={loading}
                        buttonStyle={[styles.button, { backgroundColor: '#3aa66a' }]}
                    />
                </View>
                <View className="w-full h-auto flex">

                    <Button
                        title="Sign Out"
                        onPress={() =>
                            supabase.auth
                                .signOut()
                                .then(() => router.navigate("/"))
                                .catch(console.error)
                        }
                        buttonStyle={[styles.button, { backgroundColor: '#3aa66a' }]}
                    />
                </View>

            </View>
        </View >

    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // O cualquier color de fondo que prefieras
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