import { supabase } from '../lib/supabase';
import { Question } from '../models/questionModel';
import { PostgrestError } from '@supabase/supabase-js'; 

// Función para insertar una nueva pregunta
export const createQuestion = async (question: Question): Promise<{ error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('questions') // Asegúrate de que 'questions' es el nombre correcto de tu tabla
        .insert([
            {
                exerciseid: question.exerciseid,
                question: question.question,
                linestart: question.linestart,
                lineend: question.lineend,
                correctcount: question.correctcount,
                incorrectcount: question.incorrectcount,
                feedback: question.feedback,
                createdat: question.createdat,
                correctanswerid: question.correctanswerid,
            },
        ]);

    if (error) {
        console.error('Error al crear la pregunta:', error);
        return { error };
    }

    console.log('Pregunta creada:', data);
    return { error: null }; // Si todo fue bien, devuelve null para el error
};
// Función para eliminar una pregunta por ID
export const deleteQuestionById = async (questionId: number): Promise<{ error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('questions') // Asegúrate de que 'questions' es el nombre correcto de tu tabla
        .delete()
        .eq('questionid', questionId); // Eliminar la pregunta con el ID especificado

    if (error) {
        console.error('Error al eliminar la pregunta:', error);
        return { error };
    }

    console.log('Pregunta eliminada:', data);
    return { error: null }; // Si todo fue bien, devuelve null para el error
};
// Función para eliminar preguntas por ID de ejercicio
export const deleteQuestionsByExerciseId = async (exerciseId: number): Promise<{ error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('questions') // Asegúrate de que 'questions' es el nombre correcto de tu tabla
        .delete()
        .eq('exerciseid', exerciseId); // Eliminar todas las preguntas asociadas al ID de ejercicio

    if (error) {
        console.error('Error al eliminar preguntas por exerciseId:', error);
        return { error };
    }

    console.log('Preguntas eliminadas para exerciseId:', exerciseId, data);
    return { error: null }; // Si todo fue bien, devuelve null para el error
};
// Función para actualizar una pregunta por ID
export const updateQuestionById = async (questionId: number, updatedQuestion: Partial<Question>): Promise<{ error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('questions') // Asegúrate de que 'questions' es el nombre correcto de tu tabla
        .update(updatedQuestion) // Envía los cambios
        .eq('questionid', questionId); // Filtra por el ID de la pregunta

    if (error) {
        console.error('Error al actualizar la pregunta:', error);
        return { error }; // Devuelve el error si ocurre
    }

    console.log('Pregunta actualizada:', data);
    return { error: null }; // Devuelve null si la actualización fue exitosa
};
// Función para obtener una pregunta por ID
export const getQuestionById = async (questionId: number): Promise<{ question: Question | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('questions') // Asegúrate de que 'questions' es el nombre correcto de tu tabla
        .select('*')
        .eq('questionid', questionId)
        .single(); // Obtiene un solo registro

    if (error) {
        console.error('Error al obtener la pregunta:', error);
        return { question: null, error };
    }

    return { question: data as Question, error: null }; // Asegúrate de que el tipo sea 'Question'
};
// Función para obtener todas las preguntas por ID de ejercicio
export const getAllQuestionsByExerciseId = async (exerciseId: number): Promise<{ questions: Question[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('questions') // Asegúrate de que 'questions' es el nombre correcto de tu tabla
        .select('*') // Selecciona todas las columnas
        .eq('exerciseid', exerciseId); // Filtra por el ID del ejercicio

    if (error) {
        console.error('Error al obtener preguntas por exerciseId:', error);
        return { questions: null, error }; // Devuelve null para las preguntas y el error
    }

    console.log('Preguntas obtenidas para exerciseId:', exerciseId, data);
    return { questions: data as Question[], error: null }; // Devuelve las preguntas obtenidas
};