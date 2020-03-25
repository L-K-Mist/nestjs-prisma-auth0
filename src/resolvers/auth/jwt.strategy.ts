// import { JwtDto } from './dto/jwt.dto';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
// import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_DOMAIN}`,
      algorithms: ['RS256'],
    });
  }
  // Validation is actually already handled for us by Auth0, so here we now just pipe through the validated token.

  /** From the Tutorial
   * ===================
   * By the time your application calls validate(), Auth0 has already determined the identity of the logged-in user and passes data about that user within the payload object.
   */

  /**
Shape of payload is:

payload {
iss: 'https://nestjs-prisma.eu.auth0.com/',
sub: 'auth0|5e79c74bdc707d0c6cd65ff1',
aud: [
  'https://nestjs-api.com',
  'https://nestjs-prisma.eu.auth0.com/userinfo'
],
iat: 1585039189,
exp: 1585125589,
azp: 'ubyRjuA2Kxjtf7PYgiilKL6OtoFSZM4X',
scope: 'openid profile email'
}
*/
  async validate(payload: any) {
    console.log('JwtStrategy -> validate -> payload', payload);
    // Check if we have this user's email on record
    payload.email = payload['https://nestjs-api.com/email'];
    const user = await this.authService.findUserByEmail(payload.email);
    console.log('JwtStrategy -> validate -> user', user);
    // If not, create a user
    if (!user) {
      const newUser = await this.authService.createUser(payload);
      console.log('JwtStrategy -> validate -> newUser', newUser);
      // TODO add firstname and lastname after minimalist works.
      return newUser;
    }
    return user;
  }
  // async validate(payload: JwtDto): Promise<User> {
  //   const user = await this.authService.validateUser(payload.userId);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
