import _ from "lodash";
import { Tables } from "database.types";

type SyntaxMistake = {
  generator: (code: string, error: SyntaxMistake) => QuestionPayload[];
  answersGenerator: (assignment: RegExpExecArray) => AnswerPayload[];
  feedback: string;
  mistakeName: string;
};

type AnswerPayload = {
  answer: string;
  iscorrect: boolean;
};

type QuestionPayload = {
  question: string;
  code: string;
  lineStart: number;
  lineEnd: number;
  feedback: string;
  possibleAnswers: AnswerPayload[];
};

const commonMistakes = [
  {
    generator: insertIncorrectAssignmentError,
    answersGenerator: generateAnswersForIncorrectAssignment,
    feedback:
      "Las asignaciones en C se hacen con el operador '='. Asegúrate de que estás asignando el valor correcto a la variable.",
    mistakeName: "Asignación incorrecta",
  },
];

export function generateQuestionsAndAnswers(
  exercise: Tables<"exercises">
): QuestionPayload[] {
  return commonMistakes.flatMap((mistake) =>
    mistake.generator(exercise.wrongcode, mistake)
  );
}

function insertIncorrectAssignmentError(
  code: string,
  error: SyntaxMistake
): QuestionPayload[] {
  const assignmentRegex =
    /(?<!for|while|if|else|switch|case|return|==|!=|<=|>=|<|>)\s(\w+)\s*=\s*([^;]+);/g;
  // example:
  // match "expression = !((1 == x) && 4)"
  // group 1: "expression"
  // group 2: "!((1 == x) && 4)"
  const assignments = code.matchAll(assignmentRegex);

  const questions: QuestionPayload[] = [];
  for (const assignment of assignments) {
    const lineStart = getLineNumber(code, assignment[0]);
    questions.push({
      question: assignment[0],
      code,
      lineStart,
      lineEnd: lineStart,
      feedback: error.feedback,
      possibleAnswers: error.answersGenerator(assignment),
    });
  }
  return questions;
}

function generateAnswersForIncorrectAssignment(
  assignment: RegExpExecArray
): AnswerPayload[] {
  const possibleOperators = ["==", "!=", "<=", ">=", "<", ">"];
  const incorrectOperators = _.sampleSize(possibleOperators, 3);
  return [
    ...incorrectOperators.map((operator) => ({
      answer: `${assignment[1]} ${operator} ${assignment[2]}`,
      iscorrect: false,
    })),
    {
      answer: assignment[0],
      iscorrect: true,
    },
  ];
}

function getLineNumber(code: string, text: string): number {
  return code.split("\n").findIndex((line) => line.includes(text)) + 1;
}

function getLineEnd(lineStart: number, code: string): number {
  return lineStart + code.split("\n").length - 1;
}
