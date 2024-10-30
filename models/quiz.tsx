// Quiz.tsx

export type Quiz = {
    exerciseid: number;         // ID del ejercicio
    authorId: string;           // ID del autor (usuario)
    instructions: string;       // Instrucciones del quiz
    categoryid: number;         // ID de la categoría
    wrongcode: string;          // Código incorrecto
    solutioncode: string;       // Código correcto
    title?: string;             // Código correcto
    questionsnumber?: number;   // Código correcto
    createdat?: string;         // Timestamp with time zone (usualmente se maneja como string)
};