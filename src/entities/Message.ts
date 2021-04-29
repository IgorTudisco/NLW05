// Entity Message

import { Entity, PrimaryColumn, CreateDateColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("messages")
class Message {
    
    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    text: string;

    // This is our attribute come from user and this is many to one in this relationship.
    // They type is Users.
    // Many message to one Users.

    @JoinColumn({ name: "user_id" })
    @ManyToOne( () => User )
    user: User;
    
    // The db who will do our relationship.

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    construct() {

        if (!this.id) {
            
            this.id = uuid();

        };
    };

};

export { Message };