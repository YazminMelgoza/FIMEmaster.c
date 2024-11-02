import { supabase } from "../lib/supabase";
import { Tables } from "database.types";
import { PostgrestError } from "@supabase/supabase-js";

export class QuestionService {
  // Función para insertar una nueva pregunta
  static async createQuestion(
    question: Tables<"questions">
  ): Promise<{ error: PostgrestError | null }> {
    const { data, error } = await supabase.from("questions").insert([
      {
        exerciseid: question.exerciseid,
        question: question.question,
        linestart: question.linestart,
        lineend: question.lineend,
        correctcount: question.correctcount,
        incorrectcount: question.incorrectcount,
        feedback: question.feedback,
        correctanswerid: question.correctanswerid,
      },
    ]);

    if (error) {
      console.error("Error al crear la pregunta:", error);
      return { error };
    }

    console.log("Pregunta creada:", data);
    return { error: null };
  }

  // Función para eliminar una pregunta por ID
  static async deleteQuestionById(
    questionId: number
  ): Promise<{ error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("questions")
      .delete()
      .eq("questionid", questionId);

    if (error) {
      console.error("Error al eliminar la pregunta:", error);
      return { error };
    }

    console.log("Pregunta eliminada:", data);
    return { error: null };
  }

  // Función para eliminar preguntas por ID de ejercicio
  static async deleteQuestionsByExerciseId(
    exerciseId: number
  ): Promise<{ error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("questions")
      .delete()
      .eq("exerciseid", exerciseId);

    if (error) {
      console.error("Error al eliminar preguntas por exerciseId:", error);
      return { error };
    }

    console.log("Preguntas eliminadas para exerciseId:", exerciseId, data);
    return { error: null };
  }

  // Función para actualizar una pregunta por ID
  static async updateQuestionById(
    questionId: number,
    updatedQuestion: Partial<Tables<"questions">>
  ): Promise<{ error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("questions")
      .update(updatedQuestion)
      .eq("questionid", questionId);

    if (error) {
      console.error("Error al actualizar la pregunta:", error);
      return { error };
    }

    console.log("Pregunta actualizada:", data);
    return { error: null };
  }

  // Función para obtener una pregunta por ID
  static async getQuestionById(
    questionId: number
  ): Promise<{
    question: Tables<"questions"> | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("questionid", questionId)
      .single();

    if (error) {
      console.error("Error al obtener la pregunta:", error);
      return { question: null, error };
    }

    return { question: data as Tables<"questions">, error: null };
  }

  // Función para obtener todas las preguntas por ID de ejercicio
  static async getAllQuestionsByExerciseId(
    exerciseId: number
  ): Promise<{
    questions: Tables<"questions">[] | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("exerciseid", exerciseId);

    if (error) {
      console.error("Error al obtener preguntas por exerciseId:", error);
      return { questions: null, error };
    }

    console.log("Preguntas obtenidas para exerciseId:", exerciseId, data);
    return { questions: data as Tables<"questions">[], error: null };
  }
}
