import * as React from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { router } from "expo-router"

export default function ConfirmationScreen(){
	const goToLogin = () => {
		router.navigate('/'); // Reemplaza la ruta actual
	  };
  	return (
		<View style={styles.enterOtp}>
			<Image style={[styles.statusBarLight, styles.buttonPosition]} resizeMode="cover" source={require('../../assets/images/status-bar-light2.png')}/>
			<View style={[styles.signIn, styles.logPosition]}>
				<Text style={[styles.cuentaRegistradaExitosamente, styles.ahoraSersTrasladadoLayout]}>Confirma tu cuenta</Text>
				<Text style={[styles.ahoraSersTrasladado, styles.ahoraSersTrasladadoLayout]}>Hemos enviado un enlace de confirmación a tu correo electrónico, abre el enlace para empezar a usar tu cuenta</Text>
			</View>
			<TouchableOpacity onPress={goToLogin}>
				<View style={[styles.logIn, styles.logInLayout]}>
					<View style={[styles.logInChild, styles.logPosition]} />
					<View style={[styles.button, styles.buttonFlexBox]}>
						<Text style={styles.continuar}>Continuar</Text>
					</View>
				</View>
         	</TouchableOpacity>
			
			<Image style={[styles.arrowBackIcon, styles.logPosition]} resizeMode="cover" source={require('../../assets/images/arrow-back2.png')} />
			<View style={[styles.rectangleParent, styles.buttonFlexBox]}>
				<View style={[styles.frameChild, styles.frameLayout]} />
				<View style={[styles.frameChild, styles.frameLayout]} />
				<View style={[styles.frameInner, styles.frameLayout]} />
			</View>
			<Image style={styles.enterOtpChild} resizeMode="cover" source={require('../../assets/images/success.png')} />
		</View>);
};

const styles = StyleSheet.create({
  	buttonPosition: {
    		left: 0,
    		top: 0
  	},
  	logPosition: {
    		left: 24,
    		position: "absolute"
  	},
  	ahoraSersTrasladadoLayout: {
    		width: 345,
    		textAlign: "center"
  	},
  	logInLayout: {
    		height: 60,
    		width: 345
  	},
  	buttonFlexBox: {
    		flexDirection: "row",
    		position: "absolute"
  	},
  	frameLayout: {
    		height: 4,
    		width: 32,
    		borderRadius: 2
  	},
  	statusBarLight: {
    		width: 393,
    		height: 42,
    		position: "absolute"
  	},
  	cuentaRegistradaExitosamente: {
    		fontSize: 32,
    		lineHeight: 40,
    		fontWeight: "600",
    		color: "#178f49"
  	},
  	ahoraSersTrasladado: {
    		fontSize: 14,
    		lineHeight: 22,
    		color: "#7f909f"
  	},
  	signIn: {
    		top: 407,
    		gap: 16,
    		alignItems: "center"
  	},
  	logInChild: {
    		top: 39,
    		width: 297,
    		height: 14,
    		backgroundColor: "#30a464"
  	},
  	continuar: {
    		fontSize: 16,
    		lineHeight: 24,
    		fontWeight: "500",
    		color: "#fff",
    		textAlign: "left"
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
    		top: 0
  	},
  	logIn: {
    		top: 635,
    		left: 24,
    		position: "absolute"
  	},
  	arrowBackIcon: {
    		top: 74,
    		width: 24,
    		height: 24,
    		overflow: "hidden"
  	},
  	frameChild: {
    		backgroundColor: "#cffac8"
  	},
  	frameInner: {
    		backgroundColor: "#30a464"
  	},
  	rectangleParent: {
    		top: 130,
    		left: 137,
    		gap: 12
  	},
  	enterOtpChild: {
    		top: 165,
    		left: 92,
    		width: 196,
    		height: 192,
    		position: "absolute"
  	},
  	enterOtp: {
    		backgroundColor: "#fff",
    		flex: 1,
    		width: "100%",
    		height: 852,
    		overflow: "hidden"
  	}
});


