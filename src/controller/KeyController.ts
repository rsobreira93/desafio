import {Request, Response} from "express";
import {  CreateKeyService } from "../services/CreateKeyService";

class KeyController{

    async handle(request: Request, response: Response){
        
        const {value, user} = request.body;

        const createKeyService = new CreateKeyService();

        const key = await createKeyService.execute({
            value,
            user
        });

        return response.json(key);
    }
}

export {KeyController};