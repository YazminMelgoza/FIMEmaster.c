import { supabase } from '../lib/supabase';
import { Answer } from '../models/answerModel';
import { PostgrestError } from '@supabase/supabase-js'; 

// Función para crear una nueva respuesta
export const createAnswer = async (answer: Answer): Promise<{ error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('answers') // Cambia 'answers' al nombre de tu tabla si es diferente
        .insert([
            {
                questionid: answer.questionid,
                answer: answer.answer,
                iscorrect: answer.iscorrect,
            },
        ]);

    if (error) {
        console.error('Error al insertar la respuesta:', error);
        return { error };
    }

    console.log('Respuesta creada:', data);
    return { error: null };
};
// Función para eliminar una respuesta por ID
export const deleteAnswerById = async (answerId: number): Promise<{ error: PostgrestError | null }> => {
    const { error } = await supabase
        .from('answers')
        .delete()
        .match({ answerid: answerId });

    if (error) {
        console.error('Error al eliminar la respuesta:', error);
        return { error };
    }

    console.log(`Respuesta con ID ${answerId} eliminada.`);
    return { error: null };
};
// Función para eliminar todas las respuestas por ID de pregunta
export const deleteAllAnswersByQuestionId = async (questionId: number): Promise<{ error: PostgrestError | null }> => {
    const { error } = await supabase
        .from('answers')
        .delete()
        .match({ questionid: questionId });

    if (error) {
        console.error('Error al eliminar las respuestas:', error);
        return { error };
    }

    console.log(`Todas las respuestas para la pregunta con ID ${questionId} han sido eliminadas.`);
    return { error: null };
};
// Función para actualizar una respuesta por ID
export const updateAnswerById = async (answerId: number, updatedAnswer: Answer): Promise<{ error: PostgrestError | null }> => {
    const { error } = await supabase
        .from('answers')
        .update(updatedAnswer)
        .match({ answerid: answerId });

    if (error) {
        console.error('Error al actualizar la respuesta:', error);
        return { error };
    }

    console.log(`Respuesta con ID ${answerId} actualizada.`);
    return { error: null };
};
// Función para obtener una respuesta por ID
export const getAnswerById = async (answerId: number): Promise<{ answer: Answer | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('answers')
        .select('*')
        .eq('answerid', answerId)
        .single();

    if (error) {
        console.error('Error al obtener la respuesta:', error);
        return { answer: null, error };
    }

    console.log('Respuesta obtenida:', data);
    return { answer: data, error: null };
};
// Función para obtener todas las respuestas por ID de pregunta
export const getAllAnswersByQuestionId = async (questionId: number): Promise<{ answers: Answer[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('answers')
        .select('*')
        .eq('questionid', questionId);

    if (error) {
        console.error('Error al obtener las respuestas:', error);
        return { answers: null, error };
    }

    console.log('Respuestas obtenidas:', data);
    return { answers: data, error: null };
};