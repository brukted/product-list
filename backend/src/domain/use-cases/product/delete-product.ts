import { AppError } from "../../../common/app-error"
import { IProductRepository } from "../../interfaces/repositories/product-repository"
import { IDeleteProductUseCase } from "../../interfaces/use-cases/product/delete-product"

export class DeleteProductUseCase implements IDeleteProductUseCase {
    productRepository: IProductRepository
    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository
    }

    async execute(id: String): Promise<boolean> {
        const result = await this.productRepository.deleteProduct(id)
        if (!result) {
            throw AppError.badRequest('Product not found')
        }
        return result
    }
}