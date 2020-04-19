import {Response} from "express";

function setRefreshToken(response: Response, token: string) {
    response.cookie('jct', token, {httpOnly: true});
}

export default setRefreshToken;