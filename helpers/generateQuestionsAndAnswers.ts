import _ from "lodash";
import { Tables } from "database.types";
import { getLineStartNumber } from "utils/getLineStartNumber";

type SyntaxMistake = {
  generator: (code: string, error: SyntaxMistake) => QuestionPayload[];
  answersGenerator: (assignment: RegExpExecArray) => AnswerPayload[];
  feedback: string;
  mistakeName: string;
};

type AnswerPayload = {
  answer: string;
  isCorrect: boolean;
};

type QuestionPayload = {
  question: string;
  code: string;
  lineStart: number;
  lineEnd: number;
  feedback: string;
  possibleAnswers: AnswerPayload[];
};

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
  // Regex to match assignments outside of control statements
  const assignmentRegex =
    /(?<!for|while|if|else|switch|case|return|==|!=|<=|>=|<|>)\s(\w+)\s*=\s*([^;]+);/g;
  const assignments = code.matchAll(assignmentRegex);

  const questions: QuestionPayload[] = [];
  for (const assignment of assignments) {
    const lineStart = getLineStartNumber(code, assignment[0]);
    const lineEnd = lineStart;

    questions.push({
      question: assignment[0],
      code,
      lineStart,
      lineEnd,
      feedback: error.feedback,
      possibleAnswers: _.shuffle(error.answersGenerator(assignment)),
    });
  }
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
