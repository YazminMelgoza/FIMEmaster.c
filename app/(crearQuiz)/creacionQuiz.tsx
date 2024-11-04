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
    Image,
    TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { UserService } from "../../services/user";
import { router, useRouter } from "expo-router";
import { User } from "@supabase/supabase-js";
import { Picker } from "@react-native-picker/picker";
import { Tables } from "database.types";
import { ExerciseService } from "../../services/exercise";
import { generateQuestionsAndAnswers } from "helpers/generateQuestionsAndAnswers";
import {QuestionPayload, AnswerPayload} from "../types/questionPayload";

import ConfirmarQuizScreen from './confirmarQuiz';


export default function CrearQuiz() {
    const router                        = useRouter();
    const [loading, setLoading]         = useState(true);
    const [loadedQuiz, setLoadedQuiz]   = useState(false);
    

    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [resultQuestion, setResultQuestion] = useState<QuestionPayload[]>([]);

    //Varibles para guardar el código
    const [wrongCodeText, setWrongCodeText] = useState("");
    const [solutionCodeText, setSolutionCodeText] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [objExercise, setObjExercise] = useState<Tables<"exercises"> | null>(null);

    const categories = [
        { label: "Bucles", value: "1" },
        { label: "Condicionales", value: "2" },
        { label: "Funciones", value: "3" },
        { label: "Arreglos", value: "4" },
        { label: "Matrices", value: "5" },
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data.user) {
                const id = data.user.id;
                setAuthorId(data.user.id); 
                updateExerciseState({ authorId: data.user.id }); 

                const { user, error: userError } = await UserService.getUserProfileById(
                    id
                );
                if (user) {
                    setFirstname(user.firstname || "");
                    setMiddlename(user.middlename || "");
                    setLastname(user.lastname || "");
                }
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

                
                //******** */
                const preguntas = await generateQuestionsAndAnswers(
                  objExercise as Tables<"exercises">
                );
                setResultQuestion(preguntas); 
                let wrongcodeAux = wrongCodeText;
                let lines = wrongcodeAux.split("\n");
                for (const question of preguntas)
                {
                  const { lineStart, lineEnd } = question;
                  // Asegurarse de que los índices están dentro del rango del array y son válidos
                  if (lineStart >= 1 && lineEnd <= lines.length && lineStart <= lineEnd) {
                    // Elimina las líneas desde lineStart hasta lineEnd (ajustado para índice de array)
                    lines.splice(lineStart - 1, lineEnd - lineStart + 1, ""); // Reemplaza el rango con un espacio vacío
                  }
                }
                wrongcodeAux = lines.join("\n");
                /*** SE ASIGNAN VALORES ***/
                setFieldValue(field, fileContent);
                setFieldValue("wrongcode", wrongcodeAux); 
                //Se asigna el valor del código cargado
                setSolutionCodeText(fileContent);
                setWrongCodeText(wrongcodeAux);
                //Se asigna el valor del código cargado al quiz
                updateExerciseState({ solutioncode: fileContent });
                updateExerciseState({ wrongcode: wrongcodeAux });
            } else {
                Alert.alert("Cancelado", "No se seleccionó ningún archivo.");
            }
        } catch (err) {
            Alert.alert("Error", "Hubo un problema al seleccionar el archivo.");
        }
    };
    function updateExerciseState (ejercicio: Partial<Tables<"exercises">>) {
      setObjExercise((prevExercise) => ({
          ...prevExercise!,
          ...ejercicio,
      }));
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("El título es obligatorio"),
        instructions: Yup.string().required("Las instrucciones son obligatorias"),
        categoryid: Yup.number().required("La categoría es obligatoria"),
        questionsnumber: Yup.number().required(
            "La cantidad de preguntas es obligatoria"
        ),
        solutioncode: Yup.string().required("El código de solución es obligatorio"),
        wrongcode: Yup.string().required("El código incorrecto es obligatorio"),
    });
  
  if(loadedQuiz)
  {
    return <ConfirmarQuizScreen 
    QuestionPayload={resultQuestion} 
    infoEjercicio={objExercise as Tables<"exercises"> } 
    authorName={firstname + " " + lastname }
    setLoadedQuiz={setLoadedQuiz}/>;
    
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          exerciseid: objExercise?.exerciseid || "0",
          authorId: objExercise?.authorId || "",
          instructions: objExercise?.instructions || "",
          categoryid: objExercise?.categoryid || "",
          wrongcode: objExercise?.wrongcode || "",
          solutioncode: objExercise?.solutioncode || "",
          title: objExercise?.title || "",
          questionsnumber: objExercise?.questionsnumber || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          /*
          const result = await generateQuestionsAndAnswers(
            objExercise as Tables<"exercises">
          );
          let wrongcodeAux = wrongCodeText;
          let lines = wrongcodeAux.split("\n");
          for (const question of result)
          {
            const { lineStart, lineEnd } = question;

            // Asegurarse de que los índices están dentro del rango del array y son válidos
            if (lineStart >= 1 && lineEnd <= lines.length && lineStart <= lineEnd) {
              // Elimina las líneas desde lineStart hasta lineEnd (ajustado para índice de array)
              lines.splice(lineStart - 1, lineEnd - lineStart + 1, ""); // Reemplaza el rango con un espacio vacío
            }
          }
          wrongcodeAux = lines.join("\n");
          setWrongCodeText(wrongcodeAux);
          setObjExercise((prevExercise) => ({
              ...prevExercise!,
              wrongcode: wrongcodeAux,
          }));*/
          //console.log("Wrong Code: ", objExercise?.wrongcode);
          
          //console.log("Resultado: " + result[0].question);
          //setResultQuestion(result); 
          setLoadedQuiz(true);

        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require("../../assets/images/relieve.png")}
                style={styles.headerBackgroundImage}
              />
              <View style={styles.headerContent}>
                <View style={styles.headerTextContainer}>
                  <View style={styles.backContainer}>
                    <TouchableOpacity onPress={() => router.back()}>
                      <Image
                        source={require("../../assets/images/back-icon.png")}
                        style={styles.backImage}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.headerText}>Crea un nuevo quiz</Text>
                </View>
              </View>
            </View>
            <View style={styles.main}>
              <Text style={styles.textAutorID}>
                Autor: {firstname + " " + lastname + " " + middlename}
              </Text>
              <Text style={styles.textTitleInput}>Nombre del ejercicio:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  handleChange("title")(text); 
                  updateExerciseState({ title: text }); 
                }}
              
               
                onBlur={handleBlur("title")}
                value={values.title}
                placeholder="Ingresa el nombre del ejercicio"
              />
              {errors.title && touched.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
              <Text style={styles.textTitleInput}>Instrucciones:</Text>
              <TextInput
                style={styles.input}
                onChangeText={
                  (text) => {
                    handleChange("instructions")(text);
                    updateExerciseState({ instructions: text });
                  }
                }
                onBlur={handleBlur("instructions")}
                value={values.instructions}
                placeholder="Ingresa las instrucciones"
              />
              {errors.instructions && touched.instructions && (
                <Text style={styles.errorText}>{errors.instructions}</Text>
              )}
              <Text style={styles.textTitleInput}>Categoría:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.pickerText}
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue) => {
                    setSelectedCategory(itemValue);
                    updateExerciseState({ categoryid: Number(itemValue)});
                    handleChange("categoryid")(itemValue); // Actualiza el valor en Formik
                  }}
                >
                  {categories.map((category) => (
                    <Picker.Item
                      key={category.value}
                      label={category.label}
                      value={category.value}
                      style={styles.pickerItem}
                    />
                  ))}
                </Picker>
              </View>
              {errors.categoryid && touched.categoryid && (
                <Text style={styles.errorText}>{errors.categoryid}</Text>
              )}
              <Text style={styles.textTitleInput}>Cantidad de preguntas:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(value) =>{
                  updateExerciseState({ questionsnumber: Number(value)});
                  setFieldValue("questionsnumber", value);
                  }
                }
                onBlur={handleBlur("questionsnumber")}
                value={
                  values.questionsnumber
                    ? values.questionsnumber.toString()
                    : ""
                }
                placeholder="Ingresa la cantidad de preguntas"
              />
              {errors.questionsnumber && touched.questionsnumber && (
                <Text style={styles.errorText}>{errors.questionsnumber}</Text>
              )}
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => handleFilePicker(setFieldValue, "solutioncode")}
              >
                <Text style={styles.buttonText}>Cargar Ejercicio</Text>
              </TouchableOpacity>
              <Text style={styles.textTitleCode}>Solution Code:</Text>
              {errors.solutioncode && touched.solutioncode && (
                <Text style={styles.errorText}>{errors.solutioncode}</Text>
              )}
              <Text>{solutionCodeText}</Text>
              <Text style={styles.textTitleCode}>Wrong Code:</Text>
              <Text>{wrongCodeText}</Text>
              {errors.wrongcode && touched.wrongcode && (
                <Text style={styles.errorText}>{errors.wrongcode}</Text>
              )}
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Crear Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
        justifyContent: "center",
    },
    pickerContainer: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 6,
        justifyContent: "center",
    },
    pickerText: {
        color: "#A0A0A0",
    },
    pickerItem: {
        fontSize: 14,
    },
    header: {
        flexDirection: "column",
        padding: 20,
        paddingBottom: 40,
        marginBottom: 0,
        position: "relative",
    },
    headerBackgroundImage: {
        width: 500,
        height: 150,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
    },
    headerContent: {
        flexDirection: "row",
        marginTop: 40,
    },
    headerTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 0,
    },
    backContainer: {
        flexDirection: "row",
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
        color: "#ffffff",
    },
    main: {
        padding: 20,
    },
    textAutorID: {
        paddingBottom: 20,
        color: "#00622A",
        fontSize: 16,
        fontWeight: "bold",
    },
    textTitleInput: {
        color: "#00622A",
        fontSize: 16,
        fontWeight: "bold",
    },
    textTitleCode: {
        paddingTop: 20,
        color: "#00622A",
        fontWeight: "bold",
    },
    buttons: {
        borderRadius: 6,
        backgroundColor: "#178F49",
        width: 320,
        height: 48,
        textAlign: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        marginBottom: 20,
    },
});
