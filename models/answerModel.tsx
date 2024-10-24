// answerModel.ts
export interface Answer {
    answerid: number;       // ID de la respuesta
    questionid: number;     // ID de la pregunta asociada
    answer: string;         // Texto de la respuesta
    iscorrect: boolean;     // Indica si la respuesta es correcta
}
