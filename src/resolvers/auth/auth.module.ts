import { PrismaService } from './../../services/prisma.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { AuthService } from '../../services/auth.service';
// import { AuthResolver } from './auth.resolver';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    AuthService,
    // AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    PrismaService,
  ],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
