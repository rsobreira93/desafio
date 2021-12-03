import {Request, Response} from "express";
import { CreateTransactionService } from "../services/CreateTransactionService";


class CreateTransactionController{

    async handle(request: Request, response: Response){
        const {chave, valor} = request.body;
        const {user_id} = request;

        const createTransactionService = new CreateTransactionService();

        const transaction = await createTransactionService.execute({
            user_sender: user_id,
            chave,
            valor
        });

        return response.json(transaction);
    }
}

export {CreateTransactionController}