import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateProductInput {
 

    @Field({nullable:true})
    name?: string;
    
    @Field({nullable:true})
    type?:string;
}