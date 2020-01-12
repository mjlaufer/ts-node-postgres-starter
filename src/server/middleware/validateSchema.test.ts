import { Request, Response } from 'express';
import Joi from '@hapi/joi';
import { HttpError } from '../../helpers/errors';
import validateSchema from './validateSchema';

describe('validateSchema', () => {
    let req: Request;
    let res: Response;
    const next = jest.fn();
    const mockSchema = Joi.object({ mockField: Joi.string().min(3) });
    const middleware = validateSchema(mockSchema);

    beforeEach(() => {
        jest.resetAllMocks();
        req = {} as Request;
        res = {} as Response;
    });

    test('creates a middleware', () => {
        expect.assertions(1);

        expect(typeof middleware).toBe('function');
    });

    test('validates req.body and calls next() on success', async () => {
        req.body = {
            mockField: 'foo',
        };

        expect.assertions(1);

        await middleware(req, res, next);

        expect(next).toHaveBeenCalledWith();
    });

    test('passes Bad Request error to next() if validation fails', async () => {
        req.body = {
            mockField: 'f',
        };

        expect.assertions(1);

        await middleware(req, res, next);

        expect(next).toHaveBeenCalledWith(
            new HttpError('"mockField" length must be at least 3 characters long', 400),
        );
    });
});