import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(
        @Res() response: Response,
        @Body('email') email,
        @Body('password') password
    ) {
        try {
            const { token } = await this.authService.login(email, password);

            return response.cookie('access_token', token, {
                httpOnly: true,
                secure: true
            }).json({
                status: true
            });
        } catch (err) {
            return response.json({
                status: false,
                message: err.message
            }).status(401);
        }
    }
}
