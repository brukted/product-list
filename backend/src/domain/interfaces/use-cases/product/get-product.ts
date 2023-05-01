import { Product } from "../../../entities/product";

export interface IGetProductByIdUseCase {
    execute(id: string): Promise<Product | null>;
}