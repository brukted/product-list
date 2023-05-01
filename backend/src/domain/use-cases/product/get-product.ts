import { AppError } from "../../../common/app-error"
import { Product } from "../../entities/product"
import { IProductRepository } from "../../interfaces/repositories/product-repository"
import { IGetProductByIdUseCase } from "../../interfaces/use-cases/product/get-product"

export class GetProductByIdUseCase implements IGetProductByIdUseCase {
    productRepository: IProductRepository
    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository
    }

    async execute(id: string): Promise<Product> {
        const result = await this.productRepository.getById(id)
        if (!result) {
            throw AppError.badRequest('Product not found')
        }
        return result
    }
}