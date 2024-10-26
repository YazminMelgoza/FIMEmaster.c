import { supabase } from '../lib/supabase';
import { Score } from '../models/score';
import { PostgrestError } from '@supabase/supabase-js';

export class ScoreService {

  // Función para crear un nuevo score
  static async createScore(score: Score): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
      .from('scores')
      .insert([{ 
        score: score.score, 
        userid: score.userid 
      }]);

    if (error) {
      console.error('Error al crear el score:', error);
      return { error };
    }

    console.log('Score creado correctamente');
    return { error: null };
  }

  // Función para eliminar un score por scoreId
  static async deleteScoreByScoreId(scoreId: number): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
      .from('scores')
      .delete()
      .eq('scoreid', scoreId);

    if (error) {
      console.error('Error al eliminar el score:', error);
      return { error };
    }

    console.log(`Score con ID ${scoreId} eliminado correctamente`);
    return { error: null };
  }

  // Función para actualizar un score por scoreId
  static async updateScoreByScoreId(scoreId: number, updatedScore: Score): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
      .from('scores')
      .update({
        score: updatedScore.score,
        userid: updatedScore.userid
      })
      .eq('scoreid', scoreId);

    if (error) {
      console.error('Error al actualizar el score:', error);
      return { error };
    }

    console.log(`Score con ID ${scoreId} actualizado correctamente`);
    return { error: null };
  }

  // Función para obtener un score por scoreId
  static async getScoreByScoreId(scoreId: number): Promise<{ data: Score | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('scoreid', scoreId)
      .single();

    if (error) {
      console.error('Error al obtener el score:', error);
      return { data: null, error };
    }

    return { data, error: null };
  }

  // Función para obtener todos los scores por userId
  static async getAllScoresByUserId(userId: string): Promise<{ data: Score[]; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('userid', userId);

    if (error) {
      console.error('Error al obtener scores:', error);
      return { data: [], error };
    }

    return { data, error: null };
  }
}
