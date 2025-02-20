import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ScoresModule } from './scores/scores.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsersModule, ScoresModule],
  providers: [PrismaService],
})
export class AppModule {}
