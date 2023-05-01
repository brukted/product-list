import { Product } from "../../../entities/product";

export interface IGetAllProductUseCase {
    execute(): Promise<Product[]>;
}