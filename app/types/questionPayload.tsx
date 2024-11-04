export type AnswerPayload = {
    answer: string;
    isCorrect: boolean;
  };
  
export type QuestionPayload = {
    question: string;
    code: string;
    lineStart: number;
    lineEnd: number;
    feedback: string;
    possibleAnswers: AnswerPayload[];
  };