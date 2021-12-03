import { getCustomRepository } from "typeorm";
import { KeysRepositories } from "../repositories/KeysRepositories";


class ListAllKeysService{

    async execute(user_id:string){
        const keysRepositories = getCustomRepository(KeysRepositories);

        const keys = await keysRepositories.find({
            where:{
                user: user_id,
            }
        });

        return keys;
    }
}

export {ListAllKeysService};