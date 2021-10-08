import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    
    async execute({email, password}: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email e/ou senha incorretos!");
        };

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email e/ou senha incorretos!");
        };

        const token = sign({
            email: user.email
        }, "15a33f1fd2d13dfe92b032adc4f25e7b", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token;
    };
};

export { AuthenticateUserService };