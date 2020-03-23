import {Field, ObjectType} from "type-graphql";

@ObjectType()
class LoginSession {
    @Field()
    accessToken: string;
}

export default LoginSession;