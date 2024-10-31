// QuizService.ts
import { Tables } from "database.types";
import { supabase } from "../lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export class ExerciseService {
  // Método para insertar un nuevo quiz
  public static async createQuiz(
    quiz: Tables<"exercises">
  ): Promise<{ error: PostgrestError | null }> {
    const { data, error } = await supabase.from("exercises").insert([
      {
        authorId: quiz.authorId,
        title: quiz.title,
        instructions: quiz.instructions,
        categoryid: quiz.categoryid,
        questionsnumber: quiz.questionsnumber,
        wrongcode: quiz.wrongcode,
        solutioncode: quiz.solutioncode,
        createdat: quiz.createdat,
      },
    ]);

    if (error) {
      console.error("Error al insertar el quiz:", error);
      return { error };
    }

    console.log("Ejercicio creado creado:", data);
    return { error: null };
  }

  // Método para eliminar un quiz por id
  async deleteQuizById(
    quizId: number
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
      .from("exercises") // Cambia 'exercises' al nombre de tu tabla si es diferente
      .delete()
      .eq("exerciseid", quizId); // Filtra por quizId

    if (error) {
      console.error("Error al eliminar el quiz:", error);
      return { error };
    }

    return { error: null };
  }

  // Método para actualizar un quiz por id
  async updateQuizById(
    quizId: number,
    updatedQuiz: Tables<"exercises">
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
      .from("exercises") // Cambia 'exercises' al nombre de tu tabla si es diferente
      .update({
        authorId: updatedQuiz.authorId,
        instructions: updatedQuiz.instructions,
        categoryid: updatedQuiz.categoryid,
        wrongcode: updatedQuiz.wrongcode,
        solutioncode: updatedQuiz.solutioncode,
      })
      .eq("exerciseid", quizId);

    if (error) {
      console.error("Error al actualizar el quiz:", error);
      return { error };
    }

    return { error: null };
  }

  // Método para obtener quiz por id
  public static async getQuizById(quizId: number): Promise<{
    quiz: Tables<"exercises"> | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from("exercises") // Cambia 'exercises' al nombre de tu tabla si es diferente
      .select("*")
      .eq("exerciseid", quizId)
      .single();

    if (error) {
      console.error("Error al obtener el quiz:", error);
      return { quiz: null, error };
    }

    return { quiz: data as Tables<"exercises">, error: null };
  }

  // Método para obtener quizzes por authorId
  public static async getByAuthorId(
    authorId: string
  ): Promise<{ quizzes: Tables<"exercises">[]; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .eq("authorId", authorId);

    if (error) {
      console.error("Error al obtener los quizzes:", error);
      return { quizzes: [], error };
    }

    return { quizzes: data as Tables<"exercises">[], error: null };
  }
}