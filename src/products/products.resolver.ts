// import { Query } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product-input';
import { UpdateProductInput } from './dto/update-product-input';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Resolver(of => Product)
export class ProductsResolver {
    constructor(private productsService:ProductsService) {

    }

    @Query(returns => [Product])
    products(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Mutation(returns => Product)
    createProduct(@Args('createProductInput') createProductInput: CreateProductInput) :Promise<Product> {
        return this.productsService.createProduct(createProductInput);
    }

    @Query(returns => Product)
    getProduct(@Args('id', {type: ()=> Int}) id : number) : Promise<Product> {
        return this.productsService.findSingleProduct(id);
    }

    @Mutation(returns => Product)
    async updateProduct( @Args('id', {type: ()=> Int}) id : number,
    @Args('updateProductInput') updateProductInput : UpdateProductInput
    ) : Promise<Product> {

        const product = await this.productsService.updateProduct(id,updateProductInput); 
        return product
        
    }
    
    @Mutation(returns => Product)
    async deleteProduct( @Args('id', {type: ()=> Int}) id : number) : Promise<Product> {
        return await this.productsService.deleteProduct(id); 
        
        
    }
    
}
