// questionModel.ts
export type Question = {
    questionid: number;         // ID de la pregunta
    exerciseid: number;        // ID del ejercicio asociado
    question: string;          // Texto de la pregunta
    linestart: number;         // Línea de inicio (puede referirse a un rango en el texto)
    lineend: number;           // Línea de fin (puede referirse a un rango en el texto)
    correctcount: number;      // Contador de respuestas correctas
    incorrectcount: number;    // Contador de respuestas incorrectas
    feedback?: string;         // Comentario o retroalimentación (opcional)
    createdat: string;         // Fecha de creación (puede ser un string en formato de fecha)
    correctanswerid: number;   // ID de la respuesta correcta
}
