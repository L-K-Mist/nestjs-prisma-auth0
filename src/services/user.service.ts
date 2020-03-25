import { Injectable } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PrismaService } from './prisma.service';
import { UpdateUserInput } from '../resolvers/user/dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }
}
