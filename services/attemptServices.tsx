import { supabase } from '../lib/supabase';
import { Attempt } from '../models/attemptModel';
import { PostgrestError } from '@supabase/supabase-js'; 

// Función para crear un nuevo intento
export const createAttempt = async (attempt: Attempt): Promise<{ error: PostgrestError | null }> => {
    const { error } = await supabase
        .from('attempts')
        .insert([
            {
                exerciseid: attempt.exerciseid,
                score: attempt.score,
                attemptedat: attempt.attemptedat,
                userid: attempt.userid,
            },
        ]);

    return { error };
};
// Función para eliminar intento por id
export const deleteAttemptById = async (attemptId: number): Promise<{ error: PostgrestError | null }> => {
    const { error } = await supabase
        .from('attempts')
        .delete()
        .eq('attemptid', attemptId);

    return { error };
};
// Actualizar
export const updateAttemptById = async (attemptId: number, updatedData: Partial<Attempt>): Promise<{ error: PostgrestError | null }> => {
    const { error } = await supabase
        .from('attempts')
        .update(updatedData)
        .eq('attemptid', attemptId);

    return { error };
};
// Obtener intento por Id
export const getAttemptById = async (attemptId: number): Promise<{ data: Attempt | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('attempts')
        .select('*')
        .eq('attemptid', attemptId)
        .single();

    return { data, error };
};
// Obtener todos los intentos por id de ejercicio
export const getAllAttemptsByExerciseId = async (exerciseId: number): Promise<{ data: Attempt[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('attempts')
        .select('*')
        .eq('exerciseid', exerciseId);

    return { data, error };
};