import { RtGuard } from './../common/guards';
import { Tokens } from './types';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  ////////////////////////////////////..................NOTE......................///////////////////////////////////////////
  // @UseGuards(AtGuard) ==>>>> We use this AtGuard to like if authorized user can do this thing( authorized user only can logout )
  //But if we set like  @UseGuards(AtGuard) this we need to use this for evry require signin controllers. For avoid that we can
  // directly write that part inside the main.ts (line 18, 19)

  //Meka dn api main.ts eke demma nisa okkoma controllers require Signin wenwa. e kiyanne hema ekatama access token eka oni wenawa.
  // E problem eka solve karanna karala tiyenne tawa decorator ekak hadanawa public.decorator.ts kiyala. Ita passe
  // access token eka oni nethi controllers walata witarak e adala eka ( @Public() ) meka danawa.
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    console.log('This is USer ID', userId);
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
