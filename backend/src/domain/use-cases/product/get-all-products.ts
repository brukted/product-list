import { Product } from "../../entities/product"
import { IProductRepository } from "../../interfaces/repositories/product-repository"
import { IGetAllProductUseCase } from "../../interfaces/use-cases/product/get-all-products"

export class GetAllProductsUseCase implements IGetAllProductUseCase {
    productRepository: IProductRepository
    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository
    }

    async execute(): Promise<Product[]> {
        const result = await this.productRepository.getProducts()
        return result
    }
}