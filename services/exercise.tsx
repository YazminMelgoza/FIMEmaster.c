// QuizService.ts
import { Tables } from "database.types";
import { supabase } from "../lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export class ExerciseService {
  // Método para insertar un nuevo quiz
  public static async createExercise(
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
  async deleteExerciseById(
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
  async updateExerciseById(
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
  public static async getExerciseById(quizId: number): Promise<{
    exercise: Tables<"exercises"> | null;
    error: PostgrestError | null;
  }> {
    console.log("Entra a servicio de get exercis");
    const { data, error } = await supabase
      .from("exercises") // Cambia 'exercises' al nombre de tu tabla si es diferente
      .select("*")
      .eq("exerciseid", quizId)
      .single();

    if (error) {
      console.error("Error al obtener el quiz:", error);
      return { exercise: null, error };
    }

    return { exercise: data as Tables<"exercises">, error: null };
  }

  // Método para obtener exercises por authorId
  public static async getExercisesByAuthorId(
    authorId: string
  ): Promise<{ exercises: Tables<"exercises">[]; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .eq("authorId", authorId);

    if (error) {
      console.error("Error al obtener los exercises:", error);
      return { exercises: [], error };
    }

    return { exercises: data as Tables<"exercises">[], error: null };
  }
  //Método para obtener exercises por title
  public static async getExercisesByTitle(
    searchQuery: string
  ): Promise<{ exercises: Tables<"exercises">[]; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('exercises') 
      .select('exerciseid, instructions, categoryid, wrongcode, solutioncode, authorId, title, questionsnumber, createdat') 
      .ilike('title', `%${searchQuery}%`);
  
    if (error) {
      console.error('Error fetching exercises:', error);
      return { exercises: [], error };
    }
  
    return { exercises: data as Tables<"exercises">[], error: null };
  }
  public static async getCurrentMonthQuizzesCount(): Promise<{ count: number; error: PostgrestError | null }> {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Los meses en JavaScript son 0-indexados

    const { data, error } = await supabase
      .from("exercises")
      .select("exerciseid", { count: "exact" }) // Contar los quizzes
      .gte("createdat", `${year}-${month.toString().padStart(2, '0')}-01`) // Fecha de inicio del mes
      .lt("createdat", `${year}-${(month + 1).toString().padStart(2, '0')}-01`); // Fecha de inicio del siguiente mes
      console.log(data?.length);

    if (error) {
      console.error("Error al obtener la cantidad de quizzes:", error);
      return { count: 0, error };
    }
    return { count: data?.length || 0, error: null };
  }
}
