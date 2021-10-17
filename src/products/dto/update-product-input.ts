import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UpdateProductInput {
 

    @Field({nullable:true})
    name?: string;
    
    @Field({nullable:true})
    type?:string;

    @Field({nullable:true})
    price?:number;

    @Field({nullable:true})
    discount?:number;
}