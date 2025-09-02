export interface Challenge {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  code: string[];
  bugLine: number;
  explanation: string;
  hint: string;
}