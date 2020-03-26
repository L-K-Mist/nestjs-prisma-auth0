import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService
  ) {}
  async createUser(payload: User): Promise<User> {
    const { email, sub, firstname, lastname } = payload;
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          sub,
          firstname,
          lastname,
        },
      });
      return user;
    } catch (error) {
      throw new ConflictException(`Email ${email} already used.`);
    }
  }

  findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findOne({ where: { email } });
  }
}
