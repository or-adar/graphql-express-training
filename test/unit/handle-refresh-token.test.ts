import {Request, Response} from "express";
import jsonwebtoken from "jsonwebtoken";
import handleRefreshToken from "../../src/utils/authorization/handle-refresh-token";
import TokenPayload from "../../src/entities/token-payload";
import User from "../../src/entities/user";

describe('Tests handleRefreshToken()', () => {
    test('Test token refreshment logic in case of token absence', async () => {
        const mockedRequest: Partial<Request> = {
            cookies: {}
        };
        const mockedResponse: Partial<Response> = {
            send: jest.fn()
        };

        await handleRefreshToken(mockedRequest as Request, mockedResponse as Response);

        expect(mockedResponse.send).toBeCalledWith({ok: false, accessToken: ''});
    });

    test('Test token refreshment logic in case of user absence', async () => {
        const mockedRequest = {
            cookies: {
                jct: "secret"
            }
        } as Partial<Request>;
        const mockedResponse = {
            send: jest.fn()
        } as Partial<Response>;
        const mockedPayload: Partial<TokenPayload> = {};

        jsonwebtoken.verify = jest.fn().mockResolvedValue(mockedPayload);
        User.findOne = jest.fn().mockReturnValue(undefined);

        await handleRefreshToken(mockedRequest as Request, mockedResponse as Response);

        expect(mockedResponse.send).toBeCalledWith({ok: false, accessToken: ''});
        expect(jsonwebtoken.verify).toBeCalledWith(mockedRequest.cookies.jct, process.env.REFRESH_TOKEN_KEY!);
    });

    test('Test token refreshment logic in case of terminated session', async () => {
        const mockedRequest = {
            cookies: {
                jct: "secret"
            }
        } as Partial<Request>;
        const mockedResponse = {
            send: jest.fn()
        } as Partial<Response>;

        const mockedUser: Partial<User> = {
            tokenVersion: 1
        };
        const mockedPayload: Partial<TokenPayload> = {
            tokenVersion: 2
        };

        expect(mockedUser.tokenVersion).not.toEqual(mockedPayload.tokenVersion);

        jsonwebtoken.verify = jest.fn().mockResolvedValue(mockedPayload);
        User.findOne = jest.fn().mockReturnValue(mockedUser);

        await handleRefreshToken(mockedRequest as Request, mockedResponse as Response);

        expect(mockedResponse.send).toBeCalledWith({ok: false, accessToken: ''});
        expect(jsonwebtoken.verify).toBeCalledWith(mockedRequest.cookies.jct, process.env.REFRESH_TOKEN_KEY!);
    });
});