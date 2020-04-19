import {Request, Response} from "express";
import {verify} from "jsonwebtoken";
import TokenPayload from "../../entities/token-payload";
import User from "../../entities/user";
import {createAccessToken, createRefreshToken} from "./authorization";
import setRefreshToken from "./set-refresh-token";

async function handleRefreshToken(request: Request, response: Response) {
    const token = request.cookies.jct;

    if(!token) {
        return response.send({ok: false, accessToken: ''});
    }

    try {
        let payload = verify(token, process.env.REFRESH_TOKEN_KEY!) as TokenPayload;
        const user = await User.findOne({id: payload.userId});
        if (!user) {
            return response.send({ok: false, accessToken: ''});
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return response.send({ok: false, accessToken: ''});
        }

        setRefreshToken(response, createRefreshToken(user));
        return response.send({ok: true, accessToken: createAccessToken(user)});
    } catch(error) {
        console.log(error);
        return response.send({ok: false, accessToken: ''});
    }
}

export default handleRefreshToken;