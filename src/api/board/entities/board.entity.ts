import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    author: string;

    @Column({ type: "text" })
    content: string;

    @Column({ type: "simple-array" })
    image: string[];

    @Column({ type: "simple-array" })
    hashtag: string[];
}
