/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(name: string): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await this.prisma.user.create({
      data: { name },
    });

    return {
      ...result,
      id: Number(result.id),
    } as User;
  }
}
