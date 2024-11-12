import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function TerminarQuizScreen() {
    const router = useRouter();
    const volverQuiz = () => {
        router.navigate("iniciarQuiz");

    }
    return (
        <View style={styles.containerMain}>
            <View style={styles.containerTop}>
                <StatusBar style="dark" backgroundColor='#ffffff' />
                <View style={styles.row}>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/images/back-icon.png')}
                            style={styles.buttonImage}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textTop}>Quiz finalizado</Text>
                </View>
            </View>
            <View style={styles.column}>  
                    <Image
                        source={require('../../assets/images/succesful-img.png')}
                        style={styles.imageMain}
                    />
                    <Text style={styles.textMain}>Haz finalizado el ejercicio</Text>
                    <Text style={styles.textPoints}>+10 puntos</Text>
                    <TouchableOpacity style={styles.buttonBack} onPress={() => {volverQuiz();}}>
                        <Text style={styles.textButton}>Volver al inicio</Text>
                    </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerTop: {
        height: 150,
        backgroundColor: '#178F49',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    textTop: {
        marginTop: 20,
        fontSize: 24,
        color: '#ffffff',
    },
    containerMain: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    imageMain: {
        width: 194,
        height: 190,
    },
    buttonImage: {
        width: 13,
        height: 24,
        marginLeft: 41,
        marginTop: 20,
        marginRight: 50,
    },
    buttonBack: {
        backgroundColor: '#179659',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 100,
        marginTop: 110,
    },
    textButton: {
        color: '#fff',
        fontSize: 13,
    },
    textMain: {
        color: '#178F49',
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    textPoints: {
        color: '#3BA76B',
        fontSize: 24,
        marginVertical: 20,
    },
});