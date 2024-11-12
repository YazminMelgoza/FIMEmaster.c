import * as React from "react";
import {Image, StyleSheet, Text, View, Pressable} from "react-native";

const OtroPrograma = () => {

    return (
        <View style={styles.otroPrograma}>
            <Image style={[styles.statusBarLight, styles.statusBarLightPosition]} resizeMode="cover" source={require('../../assets/images/status-bar-light2.png')} />
            <Image style={styles.imageIcon} resizeMode="cover" source={require('../../assets/images/relieve.png')} />
            <View style={[styles.otroProgramaChild, styles.statusBarLightPosition]} />
            <Pressable style={styles.vector}>
                <Image style={styles.icon} resizeMode="cover" source={require('../../assets/images/vector-flecha.png')} />
            </Pressable>
            <Text style={styles.tituloIdentificado}>Nuevo Título</Text>
            <Text style={[styles.descripcionProgramaContainer, styles.deSeptDeTypo1]}>
                <Text style={styles.descripcionProgramaContainer1}>
                    <Text style={styles.blankLine}>{' '}</Text>
                    <Text style={styles.descripcionPrograma}>Descripción del programa</Text>
                </Text>
            </Text>
            <Image style={styles.greetingsIcon} resizeMode="cover" source={require('../../assets/images/avatar.png')} />
            <Text style={[styles.nombreUsuario, styles.deSeptDeTypo]}>Juan Pérez</Text>
            <Text style={[styles.fechaPrograma, styles.deSeptDeTypo]}>10 de oct de 2024</Text>
            <View style={styles.controlsButtonsGroup}>
                <View style={[styles.controlsButtons, styles.controlsLayout]}>
                    <Text style={[styles.text, styles.textPosition]}>Cancelar</Text>
                </View>
                <View style={[styles.controlsButtons1, styles.controlsLayout]}>
                    <Text style={[styles.text1, styles.textPosition]}>Empezar ahora</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statusBarLightPosition: {
        width: 393,
        left: 0,
        position: "absolute"
    },
    greetingsLayout: {
        height: 60,
        position: "absolute"
    },
    greetings1Layout: {
        width: 196,
        left: 0
    },
    estudianteItsFlexBox: {
        alignItems: "center",
        display: "flex",
        textAlign: "left",
        position: "absolute"
    },
    frameIconPosition: {
        height: 20,
        left: 0,
        top: 0,
        position: "absolute"
    },
    deSeptDeTypo1: {
        fontWeight: "700"
    },
    deSeptDeTypo: {
        fontSize: 16,
        textAlign: "left",
        position: "absolute"
    },
    controlsLayout: {
        height: 48,
        width: 156,
        borderRadius: 48
    },
    textPosition: {
        lineHeight: 16,
        left: "50%",
        top: "50%",
        marginTop: -8,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "500",
        position: "absolute"
    },
    statusBarLight: {
        height: 42,
        top: 0
    },
    avatarIcon: {
        left: 271,
        width: 56,
        height: 56,
        top: 0,
        position: "absolute"
    },
    estudianteIts: {
        top: 24,
        lineHeight: 36,
        color: "#fff",
        fontWeight: "500",
        fontSize: 24,
        width: 196,
        left: 0
    },
    buenosDias: {
        top: 1,
        left: 28,
        fontSize: 12,
        letterSpacing: 0.5,
        lineHeight: 18,
        textTransform: "uppercase",
        textAlign: "left",
        color: "#fff",
        fontWeight: "500",
        position: "absolute"
    },
    frameIcon: {
        width: 20,
        overflow: "hidden"
    },
    goodMorning: {
        width: 113
    },
    greetings1: {
        height: 60,
        position: "absolute",
        top: 0
    },
    greetings: {
        top: 73,
        left: 42,
        width: 327
    },
    imageIcon: {
        top: 42,
        left: -29,
        width: 422,
        height: 222,
        position: "absolute"
    },
    otroProgramaChild: {
        top: 164,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: 696,
        backgroundColor: "#fff"
    },
    icon: {
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        width: "100%"
    },
    vector: {
        left: "7.12%",
        top: "10.45%",
        right: "89.57%",
        bottom: "86.74%",
        width: "3.31%",
        height: "2.82%",
        position: "absolute"
    },
    tituloIdentificado: {
        top: 86,
        left: 55,
        lineHeight: 32,
        width: 314,
        height: 40,
        textAlign: "center",
        color: "#fff",
        fontWeight: "500",
        fontSize: 24,
        position: "absolute"
    },
    blankLine: {
        fontSize: 15,
        color: "#cdcfd0"
    },
    descripcionPrograma: {
        color: "#163d2a",
        fontSize: 24
    },
    descripcionProgramaContainer1: {
        width: "100%"
    },
    descripcionProgramaContainer: {
        top: 182,
        left: 40,
        width: 337,
        alignItems: "center",
        display: "flex",
        textAlign: "left",
        position: "absolute"
    },
    greetingsIcon: {
        top: 255,
        left: 35,
        width: 34,
        height: 33,
        position: "absolute"
    },
    nombreUsuario: {
        top: 266,
        left: 82,
        lineHeight: 24,
        color: "#000",
        fontWeight: "500"
    },
    fechaPrograma: {
        top: 582,
        left: 206,
        lineHeight: 22,
        color: "#8b8b8b",
        fontWeight: "700"
    },
    text: {
        marginLeft: -30.75,
        color: "#198155"
    },
    controlsButtons: {
        backgroundColor: "#ecfce5"
    },
    text1: {
        marginLeft: -46.75,
        color: "#fff"
    },
    controlsButtons1: {
        backgroundColor: "#198155"
    },
    controlsButtonsGroup: {
        top: 765,
        left: 33,
        flexDirection: "row",
        gap: 16,
        position: "absolute"
    },
    otroPrograma: {
        flex: 1,
        height: 852,
        overflow: "hidden",
        width: "100%",
        backgroundColor: "#fff"
    }
});

export default OtroPrograma;
