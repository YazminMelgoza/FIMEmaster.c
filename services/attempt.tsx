import { supabase } from "../lib/supabase";
import { Tables } from "database.types";
import { PostgrestError } from "@supabase/supabase-js";

export class AttemptService {
  // Método para crear un nuevo intento
  async createAttempt(
    attempt: Tables<"attempts">
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase.from("attempts").insert([
      {
        exerciseid: attempt.exerciseid,
        score: attempt.score,
        attemptedat: attempt.attemptedat,
        userid: attempt.userid,
        attemptid:attempt.attemptid,
        totalerrorcount:attempt.totalerrorcount,
        errorcountbytype:attempt.errorcountbytype,
      },
    ]);

    return { error };
  }

  // Método para eliminar un intento por ID
  async deleteAttemptById(
    attemptId: number
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
      .from("attempts")
      .delete()
      .eq("attemptid", attemptId);

    return { error };
  }

  // Método para actualizar un intento por ID
  async updateAttemptById(
    attemptId: number,
    updatedData: Partial<Tables<"attempts">>
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
      .from("attempts")
      .update(updatedData)
      .eq("attemptid", attemptId);

    return { error };
  }

  // Método para obtener un intento por ID
  async getAttemptById(
    attemptId: number
  ): Promise<{
    data: Tables<"attempts"> | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from("attempts")
      .select("*")
      .eq("attemptid", attemptId)
      .single();

    return { data, error };
  }

  // Método para obtener todos los intentos por ID de ejercicio
  async getAllAttemptsByExerciseId(
    exerciseId: number
  ): Promise<{
    data: Tables<"attempts">[] | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from("attempts")
      .select("*")
      .eq("exerciseid", exerciseId);

    return { data, error };
  }
  static async getAllAttemptsByUserId(
    userId: string
  ): Promise<{
    data: Tables<"attempts">[] | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from("attempts")
      .select("*")
      .eq("userid", userId); // Fetching attempts by userId
  
    return { data, error };
  }
  static async getLastFourAttemptsByUserId(
    userId: string
  ): Promise<{
    data: Tables<"attempts">[] | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from("attempts")
      .select("*")
      .eq("userid", userId) // Fetching attempts by userId
      .order("attemptedat", { ascending: false }) // Assuming there's a created_at field to order by
      .limit(4); // Limiting the results to the last 4 attempts
  
    return { data, error };
  }
  
  
  static async getAttemptsLastMonth(userId: string): Promise<{ attempts: any[] | null; error: PostgrestError | null }> {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Resta un mes a la fecha actual

  // Convertir la fecha a formato ISO
  const isoDate = oneMonthAgo.toISOString();

  const { data: attempts, error } = await supabase
    .from('attempts')
    .select('*')
    .eq('userid', userId) // Filtrar por userId
    .gte('attemptedat', isoDate); // Filtrar por fecha mayor o igual a un mes atrás

  if (error) {
    console.error('Error al obtener los intentos del usuario del último mes:', error);
    return { attempts: null, error };
  }

  console.log('Intentos del usuario del último mes obtenidos:', attempts);
  return { attempts, error: null };
}
// Método para obtener intentos con límite
static async getAttemptsWithLimit(
  userId: string,
  limit: number
): Promise<{
  data: Tables<"attempts">[] | null;
  error: PostgrestError | null;
}> {
  const { data, error } = await supabase
    .from("attempts")
    .select("*")
    .eq("userid", userId)
    .order("attemptedat", { ascending: false })
    .limit(limit);

  return { data, error };
}
}