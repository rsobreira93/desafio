import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("keys")
class Key{

    @PrimaryColumn()
    readonly id: string;

    @Column()
    value: string;

    @JoinColumn({name: "user"})
    @ManyToOne(()=> User)
    user: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export {Key};