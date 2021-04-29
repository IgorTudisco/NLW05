// Entities Users

import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

// Import o uuid
// The V version is a kind of type of special id

import { v4 as uuid } from "uuid";

@Entity("users")
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){

        // Test of constructor
        // If id is null pass uuid string number.

        if(!this.id){
            this.id = uuid()
        };
    };
};

export { User };