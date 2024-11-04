import { supabase } from "../lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "database.types";

export class ScoreService {
  // Función para crear un nuevo score
  static async createScore(
    score: Tables<"scores">
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase.from("scores").insert([
      {
        score: score.score,
        userid: score.userid,
      },
    ]);

    if (error) {
      console.error("Error al crear el score:", error);
      return { error };
    }

    console.log("Score creado correctamente");
    return { error: null };
  }
// Método para actualizar o insertar el score en la tabla scores
async upsertScore(
  userId: string,
  newScore: number
): Promise<{ error: PostgrestError | null }> {
  // Intentar obtener el score actual del usuario
  const { data: existingScore, error: fetchError } = await supabase
    .from("scores")
    .select("*")
    .eq("userid", userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") { // Error distinto a "no existe registro"
    console.error("Error al obtener el score:", fetchError);
    return { error: fetchError };
  }

  let error: PostgrestError | null = null;

  if (existingScore) {
    // Si existe, actualiza el score
    const accumulatedScore = existingScore.score + newScore;
    const { error: updateError } = await supabase
      .from("scores")
      .update({ score: accumulatedScore})
      .eq("userid", userId);

    error = updateError;
  } else {
    // Si no existe, inserta un nuevo registro
    const { error: insertError } = await supabase
      .from("scores")
      .insert([{ userid: userId, score: newScore }]);

    error = insertError;
  }

  return { error };
}

  // Función para eliminar un score por scoreId
  static async deleteScoreByScoreId(
    scoreId: number
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
      .from("scores")
      .delete()
      .eq("scoreid", scoreId);

    if (error) {
      console.error("Error al eliminar el score:", error);
      return { error };
    }

    console.log(`Tables<'scores'> con ID ${scoreId} eliminado correctamente`);
    return { error: null };
  }

  // Función para actualizar un score por scoreId
  static async updateScoreByScoreId(
    scoreId: number,
    updatedScore: Tables<"scores">
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
      .from("scores")
      .update({
        score: updatedScore.score,
        userid: updatedScore.userid,
      })
      .eq("scoreid", scoreId);

    if (error) {
      console.error("Error al actualizar el score:", error);
      return { error };
    }

    console.log(`Tables<'scores'> con ID ${scoreId} actualizado correctamente`);
    return { error: null };
  }

  // Función para obtener un score por scoreId
  static async getScoreByScoreId(
    scoreId: number
  ): Promise<{ data: Tables<"scores"> | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .eq("scoreid", scoreId)
      .single();

    if (error) {
      console.error("Error al obtener el score:", error);
      return { data: null, error };
    }

    return { data, error: null };
  }

  // Función para obtener todos los scores por userId
  static async getAllScoresByUserId(
    userId: string
  ): Promise<{ data: Tables<"scores">[]; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("Error al obtener scores:", error);
      return { data: [], error };
    }

    return { data, error: null };
  }
}
