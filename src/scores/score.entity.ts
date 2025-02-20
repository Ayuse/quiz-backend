export interface Score {
  id: number;
  userId: string;
  score: number;
  createdAt: Date;
  user?: {
    name: string;
  };
}
