import { Product } from "../../../entities/product";

export interface ICreateProductUseCase {
    execute(product: Product): Promise<Boolean>;
}