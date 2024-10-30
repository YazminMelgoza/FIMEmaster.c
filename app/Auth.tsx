import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { Link, Stack } from "expo-router";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const screenHeight = Dimensions.get("window").height;
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const { email, password } = values;

        // Llamar a signInWithEmail con los valores del formulario
        await signInWithEmail(email, password);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.loginContainer}>
          <Image
            source={require("../assets/images/Wave.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/images/texture.png")}
            style={styles.backgroundImage}
          />

          <Text style={styles.title}>Inicia Sesión</Text>

          <Text style={styles.subtitle}>
            Ingresa tus datos para comenzar a utilizar la aplicación.
          </Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../assets/images/_Facebook.png")}
                style={styles.iconEye}
              />
              <Text style={styles.buttonText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../assets/images/_Google.png")}
                style={styles.iconEye}
              />
              <Text style={styles.buttonText}>Google</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.orDivider}>O</Text>

          <View style={styles.containerInputs}>
            <View style={styles.emailField}>
              <TextInput
                style={styles.inputField}
                placeholder="correouniversitario@uanl.edu.mx"
                placeholderTextColor="#555"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                clearButtonMode="while-editing"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.passwordField}>
              <TextInput
                style={styles.inputField}
                placeholder="********"
                placeholderTextColor="#999"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </TouchableOpacity>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <Text style={styles.registerLink}>
            ¿No tienes una cuenta?
            <Link href="/signUp/signUp">
              <Text style={styles.registerText}> Regístrate</Text>
            </Link>
          </Text>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    maxWidth: 500,
    width: "100%",
    marginHorizontal: "auto",
    backgroundColor: "#fff",
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  iconEye: {
    width: 20,
    height: 20,
  },
  title: {
    color: "#008000",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#777777",
    textAlign: "center",
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialButton: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    marginLeft: 10,
  },
  orDivider: {
    color: "#000",
    margin: 10,
  },
  containerInputs: {
    width: "100%",
  },
  emailField: {
    marginBottom: 15,
  },
  passwordField: {
    position: "relative",
    marginBottom: 15,
  },
  inputField: {
    backgroundColor: "#F5F9FE",
    borderRadius: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 2,
    width: "100%",
    height: 45,
  },
  forgotPassword: {
    color: "#777777",
    textAlign: "right",
    marginBottom: 20,
  },
  eyeIcon: {
    position: "absolute",
    fontSize: 20,
    color: "#888",
    top: 12,
    right: 10,
  },
  loginButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  registerLink: {
    color: "#000",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  registerText: {
    color: "#28a745",
    fontWeight: "bold",
    textAlign: "left",
  },

  errorText: {
    color: "red",
    marginTop: 5,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
    transform: [{ rotate: "180deg" }],
  },
});
