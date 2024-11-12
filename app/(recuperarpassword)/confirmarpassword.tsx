import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function SigInScreen() {
    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const confirmarPassword = async () =>
    {
        
        if(password != "")
        {
            const { data, error } = await supabase.auth.updateUser({
                password: password
            })
            console.log("Password Cambiado");
            router.navigate("/");
        }
        
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()} 
            >
                <Image
                    source={require('../../assets/images/arrow-back.png')}
                    style={styles.backImage}
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.text1}>Recupera tu contraseña</Text>
                <Text style={styles.text2}>Escribe una nueva contraseña</Text>
            </View>
            <View style={styles.passwordFieldContainer}>
                <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholder="Nueva contraseña"
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Image
                        source={require('../../assets/images/Vector.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.passwordFieldContainer}>
                <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!isConfirmPasswordVisible}
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    placeholder="Confirmar contraseña"
                />
                <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                    <Image
                        source={require('../../assets/images/Vector.png')}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => confirmarPassword()}>
                <Text style={styles.buttonText}>Cambiar contraseña</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButton: {
        position: 'absolute',
        top: 40, // Ajusta según sea necesario
        left: 20, // Ajusta según sea necesario
    },
    backImage: {
        width: 24,
        height: 24,
    },
    textContainer: {
        width: 314,
        height: 118,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 24,
    },
    passwordFieldContainer: {
        flexDirection: 'row',
        width: 320,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        borderColor: '#30A464',
        borderWidth: 1,
        marginVertical: 12,
    },
    buttonContainer: {
        backgroundColor: '#179659',
        width: 320,
        height: 60,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24,
    },
    text1: {
        color: '#178F49',
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    text2: {
        color: '#61677D',
        marginTop: 16,
        textAlign: 'center',
        fontSize: 14,
    },
    passwordInput: {
        backgroundColor: '#fff',
        color: '#3B4054',
        width: 257,
        height: 24,
        fontSize: 16,
    },
    passwordImage: {
        width: 16,
        height: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
    },
});
