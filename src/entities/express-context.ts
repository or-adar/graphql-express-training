import {Request, Response} from "express";
import TokenPayload from "./token-payload";

interface ExpressContext {
    req: Request;
    res: Response;
    payload?: TokenPayload;
}

export default ExpressContext;