import { Request, Response } from 'express';
import { pick } from 'lodash';
import { HttpError } from '../errors';
import * as authService from '../model/services/auth-service';
import { SignupCredentials, SignupResponse } from '../types';

export async function signup(req: Request, res: Response): Promise<void> {
    const credentials: SignupCredentials = pick(req.body, ['email', 'username', 'password']);

    const { message, user }: SignupResponse = await authService.signup(credentials);

    if (user) {
        return req.login(user, err => {
            if (err) {
                throw new HttpError(err);
            }

            return res.json({ isAuthenticated: true });
        });
    }

    res.json({ isAuthenticated: false, message });
}