// AttemptService.ts
import { supabase } from '../lib/supabase';
import { Attempt } from '../models/attempt';
import { PostgrestError } from '@supabase/supabase-js'; 

export class AttemptService {
    // Método para crear un nuevo intento
    async createAttempt(attempt: Attempt): Promise<{ error: PostgrestError | null }> {
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
    }

    // Método para eliminar un intento por ID
    async deleteAttemptById(attemptId: number): Promise<{ error: PostgrestError | null }> {
        const { error } = await supabase
            .from('attempts')
            .delete()
            .eq('attemptid', attemptId);

        return { error };
    }

    // Método para actualizar un intento por ID
    async updateAttemptById(attemptId: number, updatedData: Partial<Attempt>): Promise<{ error: PostgrestError | null }> {
        const { error } = await supabase
            .from('attempts')
            .update(updatedData)
            .eq('attemptid', attemptId);

        return { error };
    }

    // Método para obtener un intento por ID
    async getAttemptById(attemptId: number): Promise<{ data: Attempt | null; error: PostgrestError | null }> {
        const { data, error } = await supabase
            .from('attempts')
            .select('*')
            .eq('attemptid', attemptId)
            .single();

        return { data, error };
    }

    // Método para obtener todos los intentos por ID de ejercicio
    async getAllAttemptsByExerciseId(exerciseId: number): Promise<{ data: Attempt[] | null; error: PostgrestError | null }> {
        const { data, error } = await supabase
            .from('attempts')
            .select('*')
            .eq('exerciseid', exerciseId);

        return { data, error };
    }
}
