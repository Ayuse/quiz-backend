import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  async createScore(@Body() data: { userId: string; score: number }) {
    return this.scoresService.createScore(data.userId, data.score);
  }

  @Get('leaderboard')
  async getLeaderboard() {
    return this.scoresService.getLeaderboard();
  }

  @Get('user/:userId')
  async getUserScores(@Param('userId') userId: string) {
    return this.scoresService.getUserScores(userId);
  }
}
