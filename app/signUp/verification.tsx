import * as React from "react";
import { Image, StyleSheet, TextInput, Text, View } from "react-native";

const VerificationScreen = () => {
  return (
    <View style={styles.enterOtp}>
      <Image
        style={[styles.statusBarLight, styles.buttonPosition]}
        resizeMode="cover"
        source={require("../../assets/images/status-bar-light.png")}
      />
      <View style={[styles.signIn, styles.logPosition]}>
        <Text style={styles.ingresaElCdigo}>Ingresa el código</Text>
        <Text style={styles.teEnviamosUn}>
          Te enviamos un código de un solo uso a tu correo electrónico.
          Ingrésalo aquí para verificar tu correo.
        </Text>
      </View>
      <View style={[styles.logIn, styles.logInLayout]}>
        <View style={[styles.logInChild, styles.logPosition]} />
        <View style={[styles.button, styles.buttonFlexBox]}>
          <Text style={styles.verificarCorreo}>Verificar correo</Text>
        </View>
      </View>
      <Image
        style={[styles.arrowBackIcon, styles.logPosition]}
        resizeMode="cover"
        source={require("../../assets/images/arrow-back.png")}
      />
      <View style={[styles.rectangleParent, styles.logPosition]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <View style={[styles.groupItem, styles.groupChildLayout]} />
        <View style={[styles.groupInner, styles.groupChildLayout]} />
        <View style={[styles.rectangleView, styles.groupChildLayout]} />
        <View style={[styles.groupChild1, styles.groupChildLayout]} />
      </View>
      <View style={[styles.rectangleGroup, styles.buttonFlexBox]}>
        <View style={[styles.frameChild, styles.frameLayout]} />
        <View style={[styles.frameItem, styles.frameLayout]} />
        <View style={[styles.frameChild, styles.frameLayout]} />
      </View>
      <Text style={styles.noTeLlegContainer}>
        <Text style={styles.noTeLleg}>{`¿No te llegó el código?  `}</Text>
        <Text style={styles.reenviar}>Reenviar</Text>
      </Text>
      <Image
        style={styles.imageIcon}
        resizeMode="cover"
        source={require("../../assets/images/image.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonPosition: {
    left: 0,
    top: 0,
  },
  logPosition: {
    left: 24,
    position: "absolute",
  },
  logInLayout: {
    height: 60,
    width: 345,
  },
  buttonFlexBox: {
    flexDirection: "row",
    position: "absolute",
  },
  groupChildLayout: {
    height: 72,
    width: 58,
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderStyle: "solid",
    backgroundColor: "#f5f9fe",
    borderRadius: 12,
    top: -1,
    position: "absolute",
  },
  frameLayout: {
    height: 4,
    width: 32,
    borderRadius: 2,
  },
  statusBarLight: {
    width: 393,
    height: 42,
    position: "absolute",
  },
  ingresaElCdigo: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "600",
    fontFamily: "Rubik-SemiBold",
    color: "#178f49",
    textAlign: "left",
  },
  teEnviamosUn: {
    color: "#61677d",
    textAlign: "center",
    width: 345,
    fontFamily: "Rubik-Regular",
    lineHeight: 22,
    fontSize: 14,
  },
  signIn: {
    top: 389,
    gap: 16,
    alignItems: "center",
  },
  logInChild: {
    top: 39,
    width: 297,
    height: 14,
    backgroundColor: "#30a464",
  },
  verificarCorreo: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#fff",
    textAlign: "left",
  },
  button: {
    borderRadius: 14,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: "#30a464",
    height: 60,
    width: 345,
    alignItems: "center",
    left: 0,
    top: 0,
  },
  logIn: {
    top: 643,
    left: 24,
    position: "absolute",
  },
  arrowBackIcon: {
    top: 74,
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  groupChild: {
    left: -1,
  },
  groupItem: {
    left: 71,
  },
  groupInner: {
    left: 143,
  },
  rectangleView: {
    left: 215,
  },
  groupChild1: {
    left: 287,
  },
  rectangleParent: {
    top: 543,
    width: 344,
    height: 70,
  },
  frameChild: {
    backgroundColor: "#cffac8",
  },
  frameItem: {
    backgroundColor: "#30a464",
  },
  rectangleGroup: {
    top: 130,
    left: 137,
    gap: 12,
  },
  noTeLleg: {
    color: "#3b4054",
  },
  reenviar: {
    color: "#30a464",
  },
  noTeLlegContainer: {
    top: 719,
    left: 25,
    width: 305,
    fontFamily: "Rubik-Regular",
    lineHeight: 22,
    fontSize: 14,
    textAlign: "left",
    position: "absolute",
  },
  imageIcon: {
    marginLeft: -103.5,
    top: 163,
    left: "50%",
    width: 206,
    height: 198,
    position: "absolute",
  },
  enterOtp: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
  },
});

export default VerificationScreen;
