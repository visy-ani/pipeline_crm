export type Stage = "New" | "Qualified" | "Negotiation" | "Won" | "Lost";
export type Deal = {
  id: string;
  title: string;
  company: string;
  owner: string;
  value: number;
  stage: Stage;
  probability: number;
  createdAt: string;
  tags?: string[];
};
export const stages: Stage[] = [
  "New",
  "Qualified",
  "Negotiation",
  "Won",
  "Lost",
];
