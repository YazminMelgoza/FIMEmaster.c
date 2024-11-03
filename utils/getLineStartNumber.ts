export function getLineStartNumber(text: string, code: string) {
  return (
    text.split("\n").findIndex((line) => line.includes(code.split("\n")[0])) + 1
  );
}
