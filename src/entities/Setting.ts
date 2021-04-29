// import functions from typeorm.

import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";

// Import o uuid
// The V version is a kind of type of special id

import { v4 as uuid } from "uuid";

// Passing the name of my table

// Class from setting

@Entity("settings")
class Setting {

    // As the name is the same of DB, so we don't need to pass parameter in @...(...). 

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    update_at: Date;

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

// Export

export { Setting };

// I need to removing "//" in tsconfig.json from ("emitDecoratorMetadata": true) and ("experimentalDecorators": true)  