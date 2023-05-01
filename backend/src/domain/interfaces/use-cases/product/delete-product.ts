export interface IDeleteProductUseCase {
    execute(id: String): Promise<Boolean>;
}