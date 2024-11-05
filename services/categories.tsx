import { supabase } from "../lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "database.types";

export class CategoryService {

  // Función para obtener un score por scoreId
  static async getCategoryById(
    categoryId: number
  ): Promise<{ data: Tables<"categories"> | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("categoryid", categoryId)
      .single();

    if (error) {
      console.error("Error al obtener el score:", error);
      return { data: null, error };
    }

    return { data, error: null };
  }

  // Función para obtener todos los scores por userId
  static async getAllCategories(
  ): Promise<{ data: Tables<"categories">[]; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("categories")
      .select("*");

    if (error) {
      console.error("Error al obtener scores:", error);
      return { data: [], error };
    }

    return { data, error: null };
  }
}
