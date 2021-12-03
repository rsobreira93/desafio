import {EntityRepository, Repository} from "typeorm";
import {Key} from "../entities/Key";

@EntityRepository(Key)
class KeysRepositories extends Repository<Key>{}

export {KeysRepositories};