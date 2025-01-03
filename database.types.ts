export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          answer: string
          answerid: number
          iscorrect: boolean
          questionid: number
        }
        Insert: {
          answer: string
          answerid?: number
          iscorrect: boolean
          questionid: number
        }
        Update: {
          answer?: string
          answerid?: number
          iscorrect?: boolean
          questionid?: number
        }
        Relationships: [
          {
            foreignKeyName: "answers_questionid_fkey"
            columns: ["questionid"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["questionid"]
          },
        ]
      }
      attempts: {
        Row: {
          attemptedat: string
          attemptid: number
          errorcountbytype: Json | null
          exerciseid: number
          score: number
          totalerrorcount: number | null
          userid: string | null
        }
        Insert: {
          attemptedat?: string
          attemptid?: number
          errorcountbytype?: Json | null
          exerciseid: number
          score: number
          totalerrorcount?: number | null
          userid?: string | null
        }
        Update: {
          attemptedat?: string
          attemptid?: number
          errorcountbytype?: Json | null
          exerciseid?: number
          score?: number
          totalerrorcount?: number | null
          userid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attempt_exerciseid_fkey"
            columns: ["exerciseid"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["exerciseid"]
          },
        ]
      }
      categories: {
        Row: {
          categoryid: number
          name: string
        }
        Insert: {
          categoryid?: number
          name: string
        }
        Update: {
          categoryid?: number
          name?: string
        }
        Relationships: []
      }
      errortypes: {
        Row: {
          errortypeid: number
          name: string
        }
        Insert: {
          errortypeid?: number
          name: string
        }
        Update: {
          errortypeid?: number
          name?: string
        }
        Relationships: []
      }
      exercises: {
        Row: {
          authorId: string
          categoryid: number | null
          createdat: string | null
          exerciseid: number
          instructions: string
          questionsnumber: number | null
          solutioncode: string
          title: string | null
          wrongcode: string
        }
        Insert: {
          authorId: string
          categoryid?: number | null
          createdat?: string | null
          exerciseid?: number
          instructions: string
          questionsnumber?: number | null
          solutioncode: string
          title?: string | null
          wrongcode: string
        }
        Update: {
          authorId?: string
          categoryid?: number | null
          createdat?: string | null
          exerciseid?: number
          instructions?: string
          questionsnumber?: number | null
          solutioncode?: string
          title?: string | null
          wrongcode?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          correctanswerid: number | null
          correctcount: number
          exerciseid: number
          feedback: string
          incorrectcount: number
          lineend: number
          linestart: number
          question: string
          questionid: number
        }
        Insert: {
          correctanswerid?: number | null
          correctcount?: number
          exerciseid: number
          feedback: string
          incorrectcount?: number
          lineend: number
          linestart: number
          question: string
          questionid?: number
        }
        Update: {
          correctanswerid?: number | null
          correctcount?: number
          exerciseid?: number
          feedback?: string
          incorrectcount?: number
          lineend?: number
          linestart?: number
          question?: string
          questionid?: number
        }
        Relationships: [
          {
            foreignKeyName: "questions_exerciseid_fkey"
            columns: ["exerciseid"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["exerciseid"]
          },
        ]
      }
      scores: {
        Row: {
          score: number
          scoreid: number
          userid: string | null
        }
        Insert: {
          score: number
          scoreid?: number
          userid?: string | null
        }
        Update: {
          score?: number
          scoreid?: number
          userid?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          firstname: string | null
          id: string
          lastname: string | null
          middlename: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          firstname?: string | null
          id: string
          lastname?: string | null
          middlename?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
          middlename?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
