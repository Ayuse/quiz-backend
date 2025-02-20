/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Score } from './score.entity';

type PrismaScore = {
  id: string;
  userId: string;
  score: number;
  createdAt: Date;
  user?: {
    name: string;
  };
};

@Injectable()
export class ScoresService {
  constructor(private prisma: PrismaService) {}

  async createScore(userId: string, score: number): Promise<Score> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await this.prisma.score.create({
      data: {
        userId,
        score,
      },
      include: {
        user: true,
      },
    });

    return {
      ...result,
      id: Number(result.id),
    } as Score;
  }

  async getLeaderboard(): Promise<Score[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const scores = (await this.prisma.score.findMany({
      take: 10,
      orderBy: {
        score: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })) as PrismaScore[];

    return scores.map((score) => ({
      ...score,
      id: Number(score.id),
    })) as Score[];
  }

  async getUserScores(userId: string): Promise<Score[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const scores = await this.prisma.score.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return scores.map((score) => ({
      ...score,
      id: Number(score.id),
    })) as Score[];
  }
}
