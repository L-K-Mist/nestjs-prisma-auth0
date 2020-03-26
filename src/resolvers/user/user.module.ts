import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { UserService } from '../../services/user.service';

@Module({
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
