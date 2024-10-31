import { supabase } from '../lib/supabase';

import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "database.types";
export class UserService {
  // Función para obtener un usuario por ID
  static async getUserProfileById(id: string): Promise<{
    user: Tables<"users"> | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single(); // Solo esperamos un registro

    if (error) {
      console.error("Error al obtener el usuario:", error);
      return { user: null, error };
    }

    console.log("Usuario obtenido:", data);
    return { user: data, error: null };
  }
  static async getUserScoreById(id: string): Promise<{ score: number | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('scores') // Cambia 'scores' al nombre de tu tabla si es diferente
      .select('score')
      .eq('userid', id)
      .single(); // Solo esperamos un registro
  
    if (error) {
      console.error('Error al obtener el puntaje del usuario:', error);
      return { score: null, error };
    }
  
    console.log('Puntaje obtenido:', data?.score);
    return { score: data?.score ?? null, error: null };

  }
  static async getExercisesByUserId(authorId: string): Promise<{ exercises: any[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('exercises') // Nombre de la tabla de ejercicios
      .select('*')
      .eq('authorId', authorId); // Filtrar por el ID del autor

    if (error) {
      console.error('Error al obtener los ejercicios del usuario:', error);
      return { exercises: null, error };
    }

    console.log('Ejercicios obtenidos:', data);
    return { exercises: data, error: null };
  }
  // Función para actualizar el perfil de un usuario
  static async updateUserProfileById(
    user: Tables<"users">
  ): Promise<PostgrestError | null> {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          id: user.id,
          username: user.username,
          website: user.website,
          avatar_url: user.avatar_url,
          firstname: user.firstname,
          lastname: user.lastname,
          middlename: user.middlename,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) return error; // Devuelve el error de Supabase si hay un error
      console.log("Perfil actualizado:", user);
      return null; // Sin error
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      // Devuelve null si se produce un error inesperado
      return null;
    }
  }
  static async getUserRankById(userId: string): Promise<{ rank: number | null; error: PostgrestError | null }> {
    // Obtener todos los puntajes
    const { data: scores, error: scoresError } = await supabase
      .from('scores') // Especificamos el tipo de Score aquí
      .select('score, userid');

    if (scoresError) {
      console.error('Error al obtener los puntajes:', scoresError);
      return { rank: null, error: scoresError };
    }

    // Comprobar que los puntajes fueron obtenidos
    if (!scores || scores.length === 0) {
      return { rank: null, error: null }; // Retorna null si no hay puntajes
    }

    // Ordenar los puntajes en orden descendente
    const sortedScores = scores.sort((a, b) => b.score - a.score);

    // Encontrar el índice del usuario en la lista ordenada
    const userIndex = sortedScores.findIndex((score) => score.userid === userId);
    
    // Calcular el puesto (rank)
    const rank = userIndex !== -1 ? userIndex + 1 : null; // +1 para que el puesto sea 1 basado en el índice

    console.log('Puesto del usuario:', rank);
    return { rank, error: null };
  }

}
