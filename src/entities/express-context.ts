import {Request, Response} from "express";

interface ExpressContext {
    req: Request;
    res: Response;
}

export default ExpressContext;