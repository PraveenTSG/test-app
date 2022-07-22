import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        address: dto.address,
        age: Number(dto.age),
        hash,
      },
    });

    const tokens = await this.getTokens(newUser.iduser, newUser.email);
    await this.updateRtHash(newUser.iduser, tokens.refresh_token);
    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied !!');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException('Access Denied !!');

    const tokens = await this.getTokens(user.iduser, user.email);
    await this.updateRtHash(user.iduser, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    console.log('UserId', userId);
    await this.prisma.user.updateMany({
      where: {
        iduser: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        iduser: userId,
      },
    });

    if (!user || !user.hashedRt)
      throw new ForbiddenException('Access Denied !!');

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);

    if (!rtMatches) throw new ForbiddenException('Access Denied !!');

    const tokens = await this.getTokens(user.iduser, user.email);
    await this.updateRtHash(user.iduser, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(iduser: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        iduser: iduser,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(iduser: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: iduser,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        }
      ),
      this.jwtService.signAsync(
        {
          sub: iduser,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        }
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
