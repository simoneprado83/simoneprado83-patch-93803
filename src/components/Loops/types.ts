// src/types.ts

export interface Challenge {
  id: number;
  title: string;
  description: string;
  hint: string;
  solution: string;
  expected: string;
  maze: number[][];
}