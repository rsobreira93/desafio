import {Request, Response} from "express";
import { CreateUserService } from "../services/CreateUserService";


class UserController{

    async handle(request: Request, response: Response){
        
        const {name, telefone, password} = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            telefone,
            password
        });

        return response.json(user);
    }

}

export {UserController};