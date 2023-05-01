import { AppError } from "../../../../src/common/app-error";
import { Product } from "../../../../src/domain/entities/product";
import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product-repository";
import { DeleteProductUseCase } from "../../../../src/domain/use-cases/product/delete-product";
import { MockProductRepository } from "./mock-product-repository";

describe("Delete Products Use Case", () => {
    let mockProductRepository: IProductRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockProductRepository = new MockProductRepository();
    })

    test("should return true", async () => {
        const mockDeleteProductFun = jest.fn(() => Promise.resolve(true))
        jest.spyOn(mockProductRepository, "deleteProduct").mockImplementation(mockDeleteProductFun)
        const deleteProduct = new DeleteProductUseCase(mockProductRepository)
        const result = await deleteProduct.execute("id");
        expect(result).toBe(true)
        expect(mockDeleteProductFun).toBeCalledTimes(1)
        expect(mockDeleteProductFun).toBeCalledWith("id")
    });

    test("should throw AppError when product is not found", async () => {
        const mockDeleteProductFun = jest.fn(() => Promise.resolve(false))
        jest.spyOn(mockProductRepository, "deleteProduct").mockImplementation(mockDeleteProductFun)
        const deleteProduct = new DeleteProductUseCase(mockProductRepository)
        await expect(deleteProduct.execute("id")).rejects.toThrow(AppError.badRequest("Product not found"));
    });
});