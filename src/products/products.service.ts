import { Injectable } from '@nestjs/common';
import { Args, Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product-input';
import { UpdateProductInput } from './dto/update-product-input';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRespository: Repository<Product>){}
   
    
    createProduct(createProductInput : CreateProductInput): Promise<Product> {
        const newProduct =  this.productRespository.create(createProductInput);
        return this.productRespository.save(newProduct);
    }

    async updateProduct(id : number, updateProductInput : UpdateProductInput): Promise<Product > {                
        const updateProduct =  await this.productRespository.findOneOrFail(id);
        if (!updateProduct.id) {
        // tslint:disable-next-line:no-console
            console.error("Todo doesn't exist");
        }

    
        
        return this.productRespository.save({
            ...{id : id},
            ...updateProductInput // updated fields
        });
        // for (const inputkey of Object.keys(updateProductInput)) {
        //     console.log(`${inputkey}: ${updateProductInput[inputkey]}`);                    
        // }        
        // await this.productRespository.update(id, updateProduct);
        
        // return await this.productRespository.findOne(id);        
    }

    async deleteProduct(id : number): Promise<Product> { 
        const removeProduct =  await this.productRespository.findOneOrFail(id);
        const removeID = removeProduct.id;
        const didRemoveProduct =  await this.productRespository.remove(removeProduct);        
        didRemoveProduct.id = removeID;
        return didRemoveProduct;
    }               


    
    async findAll(): Promise<Product[]> {        
        return this.productRespository.find();
    }

    findSingleProduct(id:number) : Promise<Product> {
        return this.productRespository.findOneOrFail(id);
    }


}
