import { supabase } from '../lib/supabase';
import { User } from '../models/userModel';
import { PostgrestError } from '@supabase/supabase-js'; 

// Función para obtener un usuario por ID
export const getUserById = async (id: string): Promise<{ user: User | null; error: PostgrestError | null }> => {
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
    return { user: data, error: null };
};