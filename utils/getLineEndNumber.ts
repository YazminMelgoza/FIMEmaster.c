export function getLineEndNumber(startLine: number, text: string): number {
  return startLine + text.split("\n").length - 1;
}
