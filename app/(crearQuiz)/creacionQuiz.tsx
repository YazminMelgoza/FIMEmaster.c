import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Quiz } from '../../models/quiz'; // Ajusta la ruta
import { QuizService } from '../../services/quiz'; 
import { UserService } from '../../services/user';
import { router, useRouter } from "expo-router";
import { User } from '@supabase/supabase-js';

export default function CrearQuiz() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    //Varibles para guardar el código
    const [wrongCodeText, setWrongCodeText] = useState('');
    const [solutionCodeText, setSolutionCodeText] = useState('');
    const [authorId, setAuthorId] = useState('');
    //Servicio de Quiz
    const quizService = new QuizService();

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data.user) {
                const id = data.user.id;
                setAuthorId(data.user.id); // Obtiene el ID del usuario)

                const { user, error: userError } = await UserService.getUserById(id);
                if (user) {
                    setUsername(username); // Guarda los datos del usuario
                } else {
                    console.error('Error al obtener el perfil del usuario:', userError);
                }
            } else {
                console.error('Error al obtener el usuario:', error);
            }
        };

        fetchUser();
    }, []);


    const handleFilePicker = async (setFieldValue: (field: string, value: any) => void, field: string) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'text/plain', // Asegúrate de que solo seleccionas archivos de texto
                copyToCacheDirectory: true, // Esto asegura que el archivo se copie al caché
            });

            if (!result.canceled) {
                var uri2 = "";
                result.assets.forEach(asset => {
                    console.log(asset.uri); // URI de cada archivo
                    uri2 = asset.uri;
                    console.log(asset.name); // Nombre de cada archivo
                    
                });
                const uri = uri2;
                const fileContent = await FileSystem.readAsStringAsync(uri);
               
                setFieldValue(field, fileContent);
                setFieldValue('wrongcode', fileContent); // Se asigna el valor al campo wrongcode
                //Se asigna el valor del código cargado
                setSolutionCodeText(fileContent);
                setWrongCodeText(fileContent);
               
            } else {
                Alert.alert('Cancelado', 'No se seleccionó ningún archivo.');
            }
        } catch (err) {
            Alert.alert('Error', 'Hubo un problema al seleccionar el archivo.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Formik
                initialValues={{
                    exerciseid: 0,
                    authorId: '',
                    instructions: '',
                    categoryid: 0,
                    wrongcode: '',
                    solutioncode: '',
                    title: '',
                    questionsnumber: 0,
                }}
                onSubmit={async (values) => {
                    const objQuiz: Quiz = {
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
                    QuizService.createQuiz(objQuiz).then(response => {
                        if (response.error) {
                            Alert.alert('Error', 'Hubo un problema al crear el quiz. Intenta nuevamente.');
                        } else {
                              router.replace("finalizarQuiz");
                           
                        }
                    });
                    
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
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
                                    <Text style={styles.headerText}>Crea un nuevo quiz</Text>
                                </View>
                            </View>
                        </View>                    
                        <View style={styles.main}>
                            <Text style={styles.textAutorID}>Author ID: {username}</Text>
                            <Text style={styles.textTitleInput}>Nombre del ejercicio:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                value={values.title}
                                placeholder='Ingresa el nombre del ejercicio'
                            />
                            <Text style={styles.textTitleInput}>Instrucciones:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('instructions')}
                                onBlur={handleBlur('instructions')}
                                value={values.instructions}
                                placeholder='Ingresa las instrucciones'
                            />
                            <Text style={styles.textTitleInput}>Categoría:</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                onChangeText={handleChange('categoryid')} 
                                onBlur={handleBlur('categoryid')}
                                value={values.categoryid ? values.categoryid.toString() : ''}
                                placeholder='Ingresa la categoría' 
                            />
                            <Text style={styles.textTitleInput}>Cantidad de preguntas:</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                onChangeText={handleChange('questionsnumber')} 
                                onBlur={handleBlur('questionsnumber')}
                                value={values.questionsnumber ? values.questionsnumber.toString() : ''} 
                                placeholder='Ingresa la cantidad de preguntas'
                            />
                            <TouchableOpacity
                                style={styles.buttons}
                                onPress={() => handleFilePicker(setFieldValue, 'solutioncode')}
                            >
                                <Text style={styles.buttonText}>Cargar Ejercicio</Text>
                            </TouchableOpacity>
                            <Text style={styles.textTitleCode}>Solution Code:</Text>
                            <Text>{solutionCodeText}</Text>
                            <Text style={styles.textTitleCode}>Wrong Code:</Text>
                            <Text>{wrongCodeText}</Text>
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
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    header: {
        flexDirection: 'column', 
        padding: 20,
        paddingBottom: 40,
        marginBottom: 0,
        position: 'relative', 
    },
    headerBackgroundImage: {
        width: 360,
        height: 150,
        position: 'absolute',
        top: 0,
        left: 0,
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
    main: {
        padding: 20, 
    },
    textAutorID: {
        paddingBottom: 10,
    },
    textTitleInput: {
        color: '#00622A',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textTitleCode: {
        paddingTop: 20,
        color: '#00622A',
        fontWeight: 'bold',
    },
    buttons: {
        borderRadius: 6,
        backgroundColor: '#178F49',
        width: 320,
        height: 48,
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});