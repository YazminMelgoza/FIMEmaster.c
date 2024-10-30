import * as React from "react";
import {Image, StyleSheet, Text, View, Pressable} from "react-native";


export default function CrearQuizDeCdigo() {

	return (
		<View style={styles.crearQuizDeCdigo}>
			<Image style={styles.imageIcon} resizeMode="cover" source={require('../../assets/images/relieve.png')} />
			<View style={[styles.crearQuizDeCdigoChild, styles.statusBarLightPosition]} />
			<Pressable style={styles.vector} >
					<Image style={[styles.icon, styles.iconLayout]} resizeMode="cover" source={require('../../assets/images/vector-flecha.png')} />
			</Pressable>
			<Text style={styles.creaUnNuevo}>Crea un nuevo quiz</Text>
			<View style={styles.headline}>
			<View style={styles.frameParent}>
				<View style={styles.loginInput1Layout}>
					<Text style={[styles.headline1, styles.headlineTypo]}>Nombre del ejercicio</Text>
					<View style={[styles.loginInput, styles.loginBorder]}>
						<View style={styles.regularInputDoubleRow}>
							<View style={styles.placeholderValue}>
								<View style={styles.parentFlexBox}>
										<Text style={styles.ingresaTypo}>Ingresa el nombre del ejercicio</Text>
										<View style={styles.printLine}>
											<View style={[styles.rectangle, styles.iconLayout]} />
										</View>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.headlineGroupSpaceBlock}>
					<Text style={styles.headlineTypo}>Instrucciones</Text>
					<View style={[styles.loginInput1, styles.loginBorder]}>
						<View style={styles.regularInputDoubleRow}>
							<View style={styles.placeholderValue}>
								<View style={[styles.ingresaLasInstruccionesParent, styles.parentFlexBox]}>
									<Text style={[styles.ingresaLasInstrucciones, styles.ingresaTypo]}>Ingresa las instrucciones</Text>
										<View style={styles.printLine}>
											<View style={[styles.rectangle, styles.iconLayout]} />
											</View>
										</View>
									</View>
							</View>
						</View>
				</View>
				<View style={styles.headlineContainer}>
					<Text style={styles.headlineTypo}>Categoría</Text>
					<View style={[styles.loginInput2, styles.loginBorder]}>
						<View style={styles.regularInputDoubleRow}>
							<View style={styles.placeholderValue2}>
								<View style={[styles.lgicaParent, styles.parentFlexBox]}>
									<Text style={[styles.ingresaLasInstrucciones, styles.ingresaTypo]}>Lógica</Text>
										<View style={styles.printLine}>
											<View style={[styles.rectangle, styles.iconLayout]} />
										</View>
									</View>
								</View>
								{/*Fecha abajo imagen */}
							</View>
						</View>
					</View>
					<View>
						<View style={[styles.subirblanco1Parent, styles.headlineGroupSpaceBlock]}>
							{/*Cargar imagen */}
							<Text style={styles.text}>Cargar ejercicio</Text>
						</View>
					</View>
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
      			frameIconPosition: {
        				left: 0,
        				position: "absolute"
      			},
      			iconLayout: {
        				height: "100%",
        				width: "100%"
      			},
      			headlineTypo: {
        				color: "#00622a",
        				fontFamily: "Roboto-Bold",
        				fontWeight: "600",
        				lineHeight: 32,
        				fontSize: 16,
        				width: 288,
        				alignItems: "center",
        				display: "flex",
        				textAlign: "left"
      			},
      			loginBorder: {
        				borderWidth: 0.5,
        				borderColor: "#e5e5e5",
        				borderStyle: "solid",
        				backgroundColor: "#f2f2f2",
        				borderRadius: 6
      			},
      			loginIconsLayout: {
        				height: 16,
        				width: 16
      			},
      			parentFlexBox: {
        				gap: 1,
        				flexDirection: "row",
        				alignItems: "center"
      			},
      			ingresaTypo: {
        				color: "#808080",
        				fontFamily: "Roboto-Regular",
        				lineHeight: 20,
        				fontSize: 15,
        				textAlign: "left"
      			},
      			headlineGroupSpaceBlock: {
        				paddingHorizontal: 0,
        				justifyContent: "center",
        				paddingVertical: 10
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
        				alignItems: "center",
        				display: "flex",
        				fontSize: 24,
        				textAlign: "left",
        				color: "#fff",
        				fontFamily: "Rubik-Medium",
        				fontWeight: "500",
        				width: 196,
        				left: 0,
        				position: "absolute"
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
        				fontFamily: "Rubik-Medium",
        				fontWeight: "500",
        				position: "absolute"
      			},
      			frameIcon: {
        				width: 20,
        				height: 20,
        				top: 0,
        				overflow: "hidden"
      			},
      			goodMorning: {
        				width: 113,
        				height: 20,
        				top: 0
      			},
      			greetings1: {
        				width: 196,
        				height: 60,
        				left: 0,
        				top: 0,
        				position: "absolute"
      			},
      			greetings: {
        				top: 73,
        				left: 42,
        				width: 327,
        				height: 60,
        				position: "absolute"
      			},
      			imageIcon: {
        				left: -29,
        				width: 422,
        				height: 222,
        				position: "absolute"
      			},
      			crearQuizDeCdigoChild: {
        				top: 164,
        				borderTopLeftRadius: 50,
        				borderTopRightRadius: 50,
        				height: 696,
        				backgroundColor: "#fff"
      			},
      			icon: {
        				maxWidth: "100%",
        				maxHeight: "100%",
        				overflow: "hidden"
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
      			creaUnNuevo: {
        				top: 91,
        				left: 74,
        				lineHeight: 32,
        				width: 285,
        				height: 40,
        				textAlign: "center",
        				color: "#fff",
        				fontFamily: "Rubik-Medium",
        				fontWeight: "500",
        				fontSize: 24,
        				position: "absolute"
      			},
      			headline1: {
        				left: 0,
        				position: "absolute",
        				top: 0
      			},
      			rectangle: {
        				top: "0%",
        				right: "0%",
        				bottom: "0%",
        				left: "0%",
        				backgroundColor: "#1a1a1a",
        				position: "absolute"
      			},
      			printLine: {
        				width: 1,
        				display: "none",
        				height: 20
      			},
      			placeholderValue: {
        				justifyContent: "center"
      			},
      			loginIcons: {
        				overflow: "hidden"
      			},
      			arowIcons16Medium: {
        				display: "none"
      			},
      			inputIcons: {
        				padding: 8,
        				gap: 16,
        				opacity: 0,
        				flexDirection: "row"
      			},
      			regularInputDoubleRow: {
        				justifyContent: "space-between",
        				paddingLeft: 16,
        				paddingTop: 8,
        				paddingRight: 8,
        				paddingBottom: 8,
        				flexDirection: "row",
        				borderRadius: 6,
        				width: 288,
        				alignItems: "center"
      			},
      			loginInput: {
        				top: 32,
        				width: 288,
        				left: 0,
        				position: "absolute"
      			},
      			loginInput1Layout: {
        				height: 80,
        				width: 288
      			},
      			ingresaLasInstrucciones: {
        				flex: 1,
        				color: "#808080",
        				fontFamily: "Roboto-Regular",
        				lineHeight: 20
      			},
      			ingresaLasInstruccionesParent: {
        				width: 185
      			},
      			loginInput1: {
        				height: 80,
        				width: 288
      			},
      			lgicaParent: {
        				alignSelf: "stretch"
      			},
      			placeholderValue2: {
        				width: 73,
        				justifyContent: "center"
      			},
      			flechaHaciaAbajoParaNavegaIcon: {
        				width: 15,
        				height: 15
      			},
      			loginInput2: {
        				alignSelf: "stretch"
      			},
      			headlineContainer: {
        				paddingBottom: 20
      			},
      			text: {
        				lineHeight: 28,
        				fontFamily: "Poppins-SemiBold",
        				fontSize: 15,
        				fontWeight: "600",
        				textAlign: "center",
        				color: "#fff"
      			},
      			subirblanco1Parent: {
        				shadowColor: "rgba(0, 0, 0, 0.25)",
        				shadowOffset: {
          					width: 0,
          					height: 4
        				},
        				shadowRadius: 20,
        				elevation: 20,
        				shadowOpacity: 1,
        				backgroundColor: "#178f49",
        				height: 48,
        				gap: 10,
        				flexDirection: "row",
        				width: 288,
        				borderRadius: 10,
        				alignItems: "center"
      			},
      			frameParent: {
        				paddingHorizontal: 20,
        				borderRadius: 10,
        				paddingVertical: 10,
        				backgroundColor: "#fff"
      			},
      			headline: {
        				top: 204,
        				left: 9,
        				width: 375,
        				paddingHorizontal: 25,
        				paddingVertical: 10,
        				alignItems: "center",
        				position: "absolute"
      			},
      			crearQuizDeCdigo: {
        				height: 852,
        				overflow: "hidden",
        				width: "100%",
        				flex: 1,
        				backgroundColor: "#fff"
      			}
    		});
    		
    		