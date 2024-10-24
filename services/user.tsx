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
}
