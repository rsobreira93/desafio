import { getCustomRepository } from "typeorm"
import { KeysRepositories } from "../repositories/KeysRepositories";
import { TransactionsRepositories } from "../repositories/TransactionsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";


interface ITransactionRequest{
    user_sender: string;
    chave: string;
    valor: number;
}

class CreateTransactionService{

    async execute({user_sender, chave, valor}:ITransactionRequest){
        const transactionRepositories = getCustomRepository(TransactionsRepositories);
        const keyRepositories = getCustomRepository(KeysRepositories);
        const userRepositories = getCustomRepository(UsersRepositories);

        const searchKey = await keyRepositories.findOne({
            where:{
                value: chave,
            }
        });

        if(!searchKey){
            throw new Error("Key sender does not exists!");
        }

        if(searchKey.user === user_sender){
            throw new Error("Incorrect user receiver.");
        }

        if(valor <= 0){
            throw new Error("value incorrect.");
        }

        const userReceiver = await userRepositories.findOne(searchKey.user);
        
        const userSender = await userRepositories.findOne(user_sender);

        const transaction =  transactionRepositories.create({
            userSender,
            chave,
            valor,
            userReceiver
        });

        await transactionRepositories.save(transaction);

        return transaction;
    }
}

export {CreateTransactionService}