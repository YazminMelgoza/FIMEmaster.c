// quizService.ts
import { supabase } from '../lib/supabase';
import { Quiz } from '../models/quizModel';
import { PostgrestError } from '@supabase/supabase-js'; 

// Función para insertar un nuevo quiz
export const createQuiz = async (quiz: Quiz): Promise<{ error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('exercises') // Cambia 'exercises' al nombre de tu tabla si es diferente
        .insert([
            {
                authorId: quiz.authorId,
                instructions: quiz.instructions,
                categoryid: quiz.categoryid,
                wrongcode: quiz.wrongcode,
                solutioncode: quiz.solutioncode,
            },
        ]);

    if (error) {
        console.error('Error al insertar el quiz:', error);
        return { error };
    }

    console.log('Quiz creado:', data);
    return { error: null };
};
// Función para eliminar un quiz por id
export const deleteQuizById = async (quizId: number): Promise<{ error: PostgrestError | null }> => {
    const { error } = await supabase
        .from('exercises') // Cambia 'exercises' al nombre de tu tabla si es diferente
        .delete()
        .eq('exerciseid', quizId); // Filtra por quizId

    if (error) {
        console.error('Error al eliminar el quiz:', error);
        return { error }; // Devuelve el error si hay un problema
    }

    // Si se elimina correctamente, devuelve null para el error
    return { error: null };
};
// Función para actualizar un quiz por id
export const updateQuizById = async (quizId: number, updatedQuiz: Quiz): Promise<{ error: PostgrestError | null }> => {
    const { error } = await supabase
        .from('exercises') // Cambia 'exercises' al nombre de tu tabla si es diferente
        .update({
            authorId: updatedQuiz.authorId,
            instructions: updatedQuiz.instructions,
            categoryid: updatedQuiz.categoryid,
            wrongcode: updatedQuiz.wrongcode,
            solutioncode: updatedQuiz.solutioncode,
        })
        .eq('exerciseid', quizId); // Filtra por quizId

    if (error) {
        console.error('Error al actualizar el quiz:', error);
        return { error }; // Devuelve el error si hay un problema
    }

    // Si se actualiza correctamente, devuelve null para el error
    return { error: null };
};
// Función para obtener quiz por id
export const getQuizById = async (quizId: number): Promise<{ quiz: Quiz | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('exercises') // Cambia 'exercises' al nombre de tu tabla si es diferente
        .select('*')
        .eq('exerciseid', quizId)
        .single(); // Esto asegura que solo obtengamos un solo registro

    if (error) {
        console.error('Error al obtener el quiz:', error);
        return { quiz: null, error }; // Devuelve null si hay un error
    }

    // Devuelve el objeto Quiz y null para el error
    return { quiz: data as Quiz, error: null };
};
// Función para obtener quizes por authorId
export const getQuizzesByAuthorId = async (authorId: string): Promise<{ quizzes: Quiz[]; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('exercises') // Cambia 'exercises' al nombre de tu tabla si es diferente
        .select('*')
        .eq('authorId', authorId); // Filtra por authorId

    if (error) {
        console.error('Error al obtener los quizes:', error);
        return { quizzes: [], error }; // Devuelve un array vacío si hay un error
    }

    // Devuelve los quizes y null para el error
    return { quizzes: data as Quiz[], error: null };
};
