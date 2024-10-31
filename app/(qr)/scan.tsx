import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";

const EscanearCodigo = () => {
  return (
    <View style={styles.escanearCodigo}>
      <Image
        style={styles.statusBarLight}
        resizeMode="cover"
        source={require("../../assets/images/status-bar-light2.png")}
      />
      <Image
        style={styles.imageIcon}
        resizeMode="cover"
        source={require("../../assets/images/relieve.png")}
      />
      <View style={styles.escanearCodigoChild} />
      <Pressable style={styles.vector} onPress={() => router.replace("/index")}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../../assets/images/vector-flecha.png")}
        />
      </Pressable>
      <Text style={styles.fotografaElCdigo}>Fotografía el código QR</Text>
      <Text style={styles.escaneando}>Escaneando...</Text>
      <View style={styles.roundedRectangle} />
      <Image
        style={styles.cameraIcon}
        resizeMode="cover"
        source={require("../../assets/images/camera.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  escanearCodigo: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  statusBarLight: {
    height: 42,
    width: "100%",
    position: "absolute",
    top: 0,
  },
  imageIcon: {
    width: "110%",
    height: 220,
    position: "absolute",
    top: 42,
    resizeMode: "contain",
  },
  escanearCodigoChild: {
    position: "absolute",
    top: 160,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#fff",
  },
  vector: {
    position: "absolute",
    top: "10%",
    left: "5%",
    width: 30,
    height: 30,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  fotografaElCdigo: {
    fontSize: 24,
    color: "#fff",
    position: "absolute",
    top: 100,
    fontWeight: "bold",
    textAlign: "center",
    width: "70%",
  },
  escaneando: {
    fontSize: 18,
    color: "#a7a7a7",
    position: "absolute",
    bottom: 100,
    textAlign: "center",
  },
  roundedRectangle: {
    width: "85%",
    height: "55%",
    position: "absolute",
    top: "25%",
    borderRadius: 40,
    backgroundColor: "#f3fff3",
  },
  cameraIcon: {
    width: 100,
    height: 100,
    position: "absolute",
    top: "40%",
  },
});

export default EscanearCodigo;
