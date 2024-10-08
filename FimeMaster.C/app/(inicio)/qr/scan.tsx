import * as React from "react";
import {Image, StyleSheet, Text, View, Pressable} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import {useNavigation, ParamListBase} from "@react-navigation/native";
import { router } from "expo-router";


const EscanearCodigo = () => {
  	const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    		
    		return (
      			<View style={styles.escanearCodigo}>
        				<Image style={[styles.statusBarLight, styles.statusBarLightPosition]} resizeMode="cover" source={require('@/assets/images/status-bar-light2.png')} />
        				<Image style={styles.imageIcon} resizeMode="cover" source={require('@/assets/images/relieve.png')} />
        				<View style={[styles.escanearCodigoChild, styles.statusBarLightPosition]} />
        				<Pressable style={styles.vector} onPress={() => router.replace('/home')}>
          					<Image style={[styles.icon, styles.iconLayout]} resizeMode="cover" source={require('@/assets/images/vector-flecha.png')} />
        				</Pressable>
        				<Text style={[styles.fotografaElCdigo, styles.escaneandoTypo]}>Fotografía el código QR</Text>
        				<Text style={[styles.escaneando, styles.escaneandoTypo]}>Escaneando...</Text>
        				<View style={styles.roundedRectangle} />
        				<Image style={[styles.cameraIcon, styles.iconLayout]} resizeMode="cover" source={require('@/assets/images/camera.png')} />
      			</View>);
    		};
    		
    		const styles = StyleSheet.create({
      			statusBarLightPosition: {
        				width: 393,
        				left: 0,
        				position: "absolute"
      			},

      			frameIconPosition: {
        				height: 20,
        				left: 60,
        				top: 0,
        				position: "absolute"
      			},
      			iconLayout: {
        				maxHeight: "100%",
        				maxWidth: "100%",
        				overflow: "hidden"
      			},
      			escaneandoTypo: {
        				height: 40,
        				textAlign: "center",
        				fontFamily: "Rubik-Medium",
        				fontWeight: "500",
        				position: "absolute"
      			},
      			statusBarLight: {
        				height: 42,
        				top: 0
      			},
      			imageIcon: {
        				top: 42,
        				left: -29,
        				width: 422,
        				height: 222,
        				position: "absolute"
      			},
      			escanearCodigoChild: {
        				top: 164,
        				borderTopLeftRadius: 50,
        				borderTopRightRadius: 50,
        				height: 696,
        				backgroundColor: "#fff"
      			},
      			icon: {
        				height: "100%",
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
      			fotografaElCdigo: {
        				top: 91,
        				left: 74,
        				lineHeight: 32,
        				width: 285,
        				color: "#fff",
        				textAlign: "center",
        				fontSize: 24
      			},
      			escaneando: {
        				top: 703,
        				left: 79,
        				fontSize: 18,
        				lineHeight: 24,
        				color: "#a7a7a7",
        				width: 236
      			},
      			roundedRectangle: {
        				height: "53.99%",
        				width: "82.95%",
        				top: "23.12%",
        				right: "8.65%",
        				bottom: "22.89%",
        				left: "8.4%",
        				borderRadius: 40,
        				backgroundColor: "#f3fff3",
        				position: "absolute"
      			},
      			cameraIcon: {
        				height: "20%",
        				width: "50%",
        				top: "37%",
        				right: "22%",
        				bottom: "38%",
        				left: "23%",
        				position: "absolute"
      			},
      			escanearCodigo: {
        				flex: 1,
        				height: 852,
        				overflow: "hidden",
        				width: "100%",
        				backgroundColor: "#fff"
      			}
    		});
    		
    		export default EscanearCodigo;