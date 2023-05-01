import { Product } from "../../entities/product"
import { IProductRepository } from "../../interfaces/repositories/product-repository"
import { ICreateProductUseCase } from "../../interfaces/use-cases/product/create-product"

export class CreateProductUseCase implements ICreateProductUseCase {
    productRepository: IProductRepository
    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository
    }

    async execute(product: Product): Promise<boolean> {
        const result = await this.productRepository.createProduct(product)
        return result
    }
}