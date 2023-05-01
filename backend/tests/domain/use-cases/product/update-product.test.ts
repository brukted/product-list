import { Product } from "../../../../src/domain/entities/product";
import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product-repository";
import { UpdateProductUseCase } from "../../../../src/domain/use-cases/product/update-product";
import { MockProductRepository } from "./mock-product-repository";

describe("Update Product Use Case", () => {
    let mockProductRepository: IProductRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockProductRepository = new MockProductRepository();
    })

    test("should return true", async () => {
        const InputData = { id: "1", title: "title", price: 1, description: "description", brand: "brand", material: "material", color: "color", bannerImage: "bannerImage", rating: 1 };

        const mockUpdateProductFun = jest.fn(() => Promise.resolve(true))
        jest.spyOn(mockProductRepository, "updateProduct").mockImplementation(mockUpdateProductFun)

        const updateProductUseCase = new UpdateProductUseCase(mockProductRepository)
        const result = await updateProductUseCase.execute(InputData);

        expect(result).toBe(true)
        expect(mockUpdateProductFun).toBeCalledTimes(1)
        expect(mockUpdateProductFun).toBeCalledWith(InputData)
    });
});