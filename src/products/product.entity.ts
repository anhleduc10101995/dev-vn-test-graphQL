import {Field, Int, ObjectType} from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn() // typeorm Decorator
    @Field(type => Int) // graphql Decorator
    id: number;

    @Column()
    @Field()
    name: string;
    
    @Column({nullable: true})
    @Field({nullable: true})
    type?: string;   


    @Column({nullable: true})
    @Field({nullable: true})
    price?: number;   

    @Column({nullable: true})
    @Field({nullable: true})
    discount?: number;   
}


