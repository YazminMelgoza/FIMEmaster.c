import _ from "lodash";
import { Tables } from "database.types";
import { getLineStartNumber } from "utils/getLineStartNumber";
import {QuestionPayload, AnswerPayload} from "../app/types/questionPayload";

type SyntaxMistake = {
  generator: (code: string, error: SyntaxMistake) => QuestionPayload[];
  answersGenerator: (assignment: RegExpExecArray) => AnswerPayload[];
  feedback: string;
  mistakeName: string;
};
/*
type AnswerPayload = {
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
};*/

const commonMistakes: SyntaxMistake[] = [
  {
    generator: insertIncorrectAssignmentError,
    answersGenerator: generateAnswersForIncorrectAssignment,
    feedback:
      "Las asignaciones en C se hacen con el operador '='. Asegúrate de que estás asignando el valor correcto a la variable.",
    mistakeName: "Asignación incorrecta",
  },
];

export function generateQuestionsAndAnswers(
  solutionCode: string
): QuestionPayload[] {
  return commonMistakes.flatMap((mistake) =>
    mistake.generator(solutionCode, mistake)
  );
}

function insertIncorrectAssignmentError(
  code: string,
  error: SyntaxMistake
): QuestionPayload[] {
  const assignmentRegex =
    /(?<!for|while|if|else|switch|case|return|==|!=|<=|>=|<|>)[\t\f\cK ]*(\w+)\s*=\s*([^;]+);/g;
  const assignments = [...code.matchAll(assignmentRegex)];

  let questions: QuestionPayload[] = [];
  assignments.forEach((assignment) => {
    let lineStart = getLineStartNumber(code, assignment[0]);
    if (!lineStart) {
      lineStart = 1;
    }
    questions.push({
      question: `¿Cuál de las siguientes asignaciones es la correcta para la variable ${assignment[1]}?`,
      code: "",
      lineStart,
      lineEnd: lineStart,
      feedback: error.feedback,
      possibleAnswers: _.shuffle(error.answersGenerator(assignment)),
    });
  });
  return questions;
}

function generateAnswersForIncorrectAssignment(
  assignment: RegExpExecArray
): AnswerPayload[] {
  const possibleOperators = ["==", "!=", "<=", ">=", "<", ">"];
  const incorrectOperators = _.sampleSize(possibleOperators, 3);

  return _.shuffle([
    ...incorrectOperators.map((operator) => ({
      answer: `${assignment[1]} ${operator} ${assignment[2]}`,
      isCorrect: false,
    })),
    {
      answer: assignment[0],
      isCorrect: true,
    },
  ]);
}
