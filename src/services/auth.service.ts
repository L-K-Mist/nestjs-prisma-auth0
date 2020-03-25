import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
// import { SignupInput } from '../resolvers/auth/dto/signup.input';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService
  ) {}
  // TODO get rid of "any" type
  async createUser(payload: any): Promise<User> {
    // const hashedPassword = await this.passwordService.hashPassword(
    //   payload.password
    // );
    /**
     *
     */
    const { email, sub } = payload;
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          sub,
        },
      });

      return user;
    } catch (error) {
      throw new ConflictException(`Email ${email} already used.`);
    }
  }

  // async login(email: string, password: string): Promise<string> {
  //   const user = await this.prisma.user.findOne({ where: { email } });

  //   if (!user) {
  //     throw new NotFoundException(`No user found for email: ${email}`);
  //   }

  //   const passwordValid = await this.passwordService.validatePassword(
  //     password,
  //     user.password
  //   );

  //   if (!passwordValid) {
  //     throw new BadRequestException('Invalid password');
  //   }

  //   return this.jwtService.sign({ userId: user.id });
  // }

  findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findOne({ where: { email } });
  }

  getUserFromToken(token: string): Promise<User> {
    const email = this.jwtService.decode(token)['email'];
    return this.prisma.user.findOne({ where: { email } });
  }
}
