import { supabase } from '../lib/supabase';
import { User } from '../models/user';
import { PostgrestError } from '@supabase/supabase-js';

export class UserService {

  // Función para obtener un usuario por ID
  static async getUserById(id: string): Promise<{ user: User | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('profiles') // Cambia 'profiles' al nombre de tu tabla si es diferente
      .select('*')
      .eq('id', id)
      .single(); // Solo esperamos un registro

    if (error) {
      console.error('Error al obtener el usuario:', error);
      return { user: null, error };
    }

    console.log('Usuario obtenido:', data);
    return { user: data as User, error: null };
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

}
