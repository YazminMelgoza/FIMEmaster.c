import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Button} from 'react-native';
import React, { useState } from 'react';

export default function SigInScreen() {

    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return(
        <View style={styles.container}>
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
                    />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Image
                        source={require('../../assets/images/Vector.png')}
                        />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Cambiar tu contraseña</Text>
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
        marginVertical: 24,
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
})