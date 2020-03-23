import {Request, Response, NextFunction} from 'express';

type ExpressMiddleware = (request: Request, response: Response, next: NextFunction) => void;

export default ExpressMiddleware