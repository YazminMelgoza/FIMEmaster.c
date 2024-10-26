// attemptModel.ts
export type Attempt = {
    attemptid: number;    // ID del intento
    exerciseid: number;   // ID del ejercicio al que se intentó
    score: number;        // Puntuación obtenida en el intento
    attemptedat: string;  // Fecha en que se realizó el intento (puede ser en formato ISO)
    userid: string;       // ID del usuario que realizó el intento (UUID)
}