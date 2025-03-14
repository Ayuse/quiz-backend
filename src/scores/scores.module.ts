import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ScoresController],
  providers: [ScoresService, PrismaService],
})
export class ScoresModule {}
