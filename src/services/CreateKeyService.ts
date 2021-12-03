import { getCustomRepository } from "typeorm";
import { KeysRepositories } from "../repositories/KeysRepositories";

interface IKeysRequest{
    value: string;
    user: string;
}

class CreateKeyService{

    async execute({value, user}: IKeysRequest){
        const keysRepository = getCustomRepository(KeysRepositories);

        if(!value){
            throw new Error("Key incorrect.");
        }

        const keyAlreadExists = await keysRepository.findOne({
            value,
        });

        if(keyAlreadExists){
            throw new Error("Key Already Exists.");
        }

        const [contKeyUsers, cont] = await keysRepository.findAndCount({
            user,
        });

        if(cont >= 3){
            throw new Error("This user already has more than 3 keys.");
        }
        const key = keysRepository.create({
            value,
            user,
        });

        await keysRepository.save(key);
        return key;
    }
}

export {CreateKeyService};