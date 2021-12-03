import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";


interface IAuthenticateRequest{
    telefone: string;
    password: string;
}

class AuthenticateUserService{

    async execute({telefone, password}: IAuthenticateRequest){
        const userRepositories = getCustomRepository(UsersRepositories);

        const user = await userRepositories.findOne({
            telefone,
        });

        if(!user){
            throw new Error("Telefone/Password incorrect");
        }

        const isPassword = await compare(password, user.password);

        if(!isPassword){
            throw new Error("Telefone/Password incorrect");
        }

        const token = sign({
            email: user.telefone
        }, "94c47448f51386073450c44b86ce7367", {
            subject: user.id,
            expiresIn: "1d",
        });

        return token;
    }
}

export { AuthenticateUserService };