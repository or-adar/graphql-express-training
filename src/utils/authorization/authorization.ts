import User from "../../entities/user";
import {sign, verify} from "jsonwebtoken";
import {MiddlewareFn} from "type-graphql";
import ExpressContext from "../../entities/express-context";
import TokenPayload from "../../entities/token-payload";

function createAccessToken(user: User) {
    return sign({userId: user.id, tokenVersion: user.tokenVersion}, process.env.ACCESS_TOKEN_KEY!, {expiresIn: "15m"});
}

function createRefreshToken(user: User) {
    return sign({userId: user.id, tokenVersion: user.tokenVersion}, process.env.REFRESH_TOKEN_KEY!, {expiresIn: "7d"});
}

const isAuthorized: MiddlewareFn<ExpressContext> = ({context}, next) => {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
        throw new Error("User did not authenticate");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_KEY!);
        context.payload = payload as TokenPayload;

    } catch (error) {
        throw new Error("User did not authenticate");
    }

    return next();
};

export {createAccessToken, createRefreshToken, isAuthorized};