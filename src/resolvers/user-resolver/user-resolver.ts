import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import User from "../../entities/user";
import {hash, compare} from "bcryptjs";
import LoginSession from "../../entities/login-session";
import {sign} from "jsonwebtoken";
import ExpressContext from "../../entities/express-context";

@Resolver(User)
class UserResolver {
    @Mutation(returns => User)
    async register(
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const hashedPassword = await hash(password, 12);
        return await User.create({
            email: email,
            password: hashedPassword
        }).save();
    }

    @Mutation(returns => LoginSession)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() {res}: ExpressContext
    ): Promise<LoginSession> {
        const user = await User.findOne({
            email: email
        });

        if (!user) {
            throw new Error("User does not exist");
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
            throw new Error("Email and password does not match");
        }

        res.cookie('jct', sign({userId: user.id}, 'hfkjgdfgadgf', {expiresIn: "7d"}), {httpOnly: true});

        return {
            accessToken: sign({userId: user.id}, 'adgsyrrwbjyedsafdc', {expiresIn: "15m"})
        }
    }

    @Query(returns => [User])
    async users() {
        return User.find();
    }
}

export default UserResolver;