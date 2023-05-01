import { Product } from "../../../entities/product";

export interface IUpdateProductUseCase {
    execute(product: Product): Promise<Boolean>;
}