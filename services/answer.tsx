// AnswerService.ts
import { supabase } from '../lib/supabase';
import { Answer } from '../models/answer';
import { PostgrestError } from '@supabase/supabase-js'; 

export class AnswerService {

    // Método para crear una nueva respuesta
    async createAnswer(answer: Answer): Promise<{ error: PostgrestError | null }> {
        const { data, error } = await supabase
            .from('answers') 
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
    }

    // Método para eliminar una respuesta por ID
    async deleteAnswerById(answerId: number): Promise<{ error: PostgrestError | null }> {
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
    }

    // Método para eliminar todas las respuestas por ID de pregunta
    async deleteAllAnswersByQuestionId(questionId: number): Promise<{ error: PostgrestError | null }> {
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
    }

    // Método para actualizar una respuesta por ID
    async updateAnswerById(answerId: number, updatedAnswer: Answer): Promise<{ error: PostgrestError | null }> {
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
    }

    // Método para obtener una respuesta por ID
    async getAnswerById(answerId: number): Promise<{ answer: Answer | null; error: PostgrestError | null }> {
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
        return { answer: data as Answer, error: null };
    }

    // Método para obtener todas las respuestas por ID de pregunta
    async getAllAnswersByQuestionId(questionId: number): Promise<{ answers: Answer[] | null; error: PostgrestError | null }> {
        const { data, error } = await supabase
            .from('answers')
            .select('*')
            .eq('questionid', questionId);

        if (error) {
            console.error('Error al obtener las respuestas:', error);
            return { answers: null, error };
        }

        console.log('Respuestas obtenidas:', data);
        return { answers: data as Answer[], error: null };
    }
}
