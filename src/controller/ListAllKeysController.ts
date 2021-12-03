import { Request, Response } from "express";
import { ListAllKeysService } from "../services/ListAllKeysService";


class ListAllKeysController{

    async handle(request: Request, response: Response){
        const listaAllKeysService = new ListAllKeysService();
        const {user_id} = request;
        
        const keys = await listaAllKeysService.execute(user_id);

        return response.json(keys);
    }
}

export { ListAllKeysController };