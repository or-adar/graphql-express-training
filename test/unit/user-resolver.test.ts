import UserResolver from "../../src/resolvers/user-resolver/user-resolver";
import User from "../../src/entities/user";
import bcryptjs from "bcryptjs";

describe('Tests UserResolver', () => {
    test('Test user registration logic', async () => {
        const hashedPassword = '45678';
        const user: Partial<User> = {email:'user@email.com', password: '12345'};
        User.create = jest.fn().mockReturnValue(user);
        user.save = jest.fn().mockResolvedValue(user);
        bcryptjs.hash = jest.fn().mockResolvedValue(hashedPassword);

        const resolver = new UserResolver();
        await resolver.register(user.email, user.password);


        expect(User.create).toBeCalledWith({email: user.email, password: hashedPassword});
        expect(bcryptjs.hash).toBeCalled();
        expect(user.save).toBeCalled();
    });
});