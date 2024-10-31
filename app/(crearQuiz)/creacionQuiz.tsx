import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Tables } from "database.types";
import { ExerciseService } from "../../services/exercise";
import { router } from "expo-router";

export default function CrearQuiz() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  //Varibles para guardar el código
  const [wrongCodeText, setWrongCodeText] = useState("");
  const [solutionCodeText, setSolutionCodeText] = useState("");
  const [authorId, setAuthorId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        setAuthorId(data.user.id); // Obtiene el ID del usuario
      } else {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
  }, []);

  const handleFilePicker = async (
    setFieldValue: (field: string, value: any) => void,
    field: string
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/plain", // Asegúrate de que solo seleccionas archivos de texto
        copyToCacheDirectory: true, // Esto asegura que el archivo se copie al caché
      });

      if (!result.canceled) {
        var uri2 = "";
        result.assets.forEach((asset) => {
          console.log(asset.uri); // URI de cada archivo
          uri2 = asset.uri;
          console.log(asset.name); // Nombre de cada archivo
        });
        const uri = uri2;
        const fileContent = await FileSystem.readAsStringAsync(uri);

        setFieldValue(field, fileContent);
        setFieldValue("wrongcode", fileContent); // Se asigna el valor al campo wrongcode
        //Se asigna el valor del código cargado
        setSolutionCodeText(fileContent);
        setWrongCodeText(fileContent);
      } else {
        Alert.alert("Cancelado", "No se seleccionó ningún archivo.");
      }
    } catch (err) {
      Alert.alert("Error", "Hubo un problema al seleccionar el archivo.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          exerciseid: 0,
          authorId: "",
          instructions: "",
          categoryid: 0,
          wrongcode: "",
          solutioncode: "",
          title: "",
          questionsnumber: 0,
        }}
        onSubmit={async (values) => {
          const objQuiz: Tables<"exercises"> = {
            exerciseid: 0,
            authorId: authorId,
            instructions: values.instructions,
            categoryid: values.categoryid,
            wrongcode: values.wrongcode,
            solutioncode: values.solutioncode,
            title: values.title,
            questionsnumber: values.questionsnumber,
            createdat: new Date().toISOString(),
          };
          console.log(objQuiz);
          ExerciseService.createQuiz(objQuiz).then((response) => {
            if (response.error) {
              Alert.alert(
                "Error",
                "Hubo un problema al crear el quiz. Intenta nuevamente."
              );
            } else {
              router.replace("finalizarQuiz");
            }
          });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
        }) => (
          <View>
            <Text>Author ID: {authorId}</Text>
            <Text>Title:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
            />
            <Text>Instructions:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("instructions")}
              onBlur={handleBlur("instructions")}
              value={values.instructions}
            />

            <Text>Category ID:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange("categoryid")}
              onBlur={handleBlur("categoryid")}
              value={values.categoryid ? values.categoryid.toString() : ""}
            />
            <Text>Cantidad de preguntas:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange("questionsnumber")}
              onBlur={handleBlur("questionsnumber")}
              value={
                values.questionsnumber ? values.questionsnumber.toString() : ""
              }
            />

            <Button
              title="Cargar Ejercicio"
              onPress={() => handleFilePicker(setFieldValue, "solutioncode")}
            />
            <Text>Solution Code:</Text>
            <Text>{solutionCodeText}</Text>
            <Text>Wrong Code:</Text>
            <Text>{wrongCodeText}</Text>
            <Button title="Crear Quiz" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
