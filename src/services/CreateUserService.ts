import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import {hash} from "bcryptjs";

interface IUserRequest{
    name: string;
    telefone: string;
    password: string;
}

class CreateUserService{

    async execute({name, telefone, password}: IUserRequest){
        const userRepository = getCustomRepository(UsersRepositories)

        if(!telefone){
            throw new Error("Telefone incorrect.");
        }
        const userAlreadyExists = await userRepository.findOne({
            telefone,
        });

        if(userAlreadyExists){
            throw new Error("User Already Exists.");
        }

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name,
            telefone,
            password: passwordHash,
        });

        await userRepository.save(user);

        return user;
    }
}

export {CreateUserService};