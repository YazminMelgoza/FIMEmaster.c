import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

export default function TerminarQuizScreen() {

    const router = useRouter();

    return (
        /* HEADER */
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/relieve.png')}
                    style={styles.headerBackgroundImage}
                />
                <View style={styles.headerContent}>
                    <View style={styles.headerTextContainer}>
                        <View style={styles.backContainer}>
                            <TouchableOpacity
                                onPress={() => router.back()}>
                                <Image
                                    source={require('../../assets/images/back-icon.png')}
                                    style={styles.backImage}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>Quiz finalizado</Text>
                    </View>
                </View>     
            </View>

            {/* MAIN */}

            <View style={styles.whiteBackgroundContainer}>
                <Image
                    source={require('../../assets/images/succesful-img.png')}
                    style={styles.imageMain}
                    />
                <Text style={styles.textMain}>Haz finalizado el ejercicio</Text>
                <Text style={styles.textPoints}>+10 puntos</Text>
                <TouchableOpacity 
                    style={styles.buttonBack}
                    onPress={() => router.back()}
                >
                <Text style={styles.textButton}>Volver al inicio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        marginTop: 40, 
    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0, 
    },
    backContainer: {
        flexDirection: 'row',
    },
    backImage: {
        marginTop: 20,
        marginLeft: 20,
        width: 13,
        height: 24,
    },
    headerText: {
        marginTop: 20,
        marginLeft: 51,
        fontSize: 24,
        color: '#ffffff',
    },
    whiteBackgroundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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