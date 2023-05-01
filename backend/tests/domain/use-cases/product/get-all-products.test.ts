import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product-repository";
import { GetAllProductsUseCase } from "../../../../src/domain/use-cases/product/get-all-products";
import { MockProductRepository } from "./mock-product-repository";

describe("Get All Products Use Case", () => {
    let mockProductRepository: IProductRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockProductRepository = new MockProductRepository();
    })

    test("should return true", async () => {
        const InputData = [{ id: "1", title: "title", price: 1, description: "description", brand: "brand", material: "material", color: "color", bannerImage: "bannerImage", rating: 1 }];

        const mockGetProductsFun = jest.fn(() => Promise.resolve(InputData))
        jest.spyOn(mockProductRepository, "getProducts").mockImplementation(mockGetProductsFun)
        const getProductsUseCase = new GetAllProductsUseCase(mockProductRepository)
        const result = await getProductsUseCase.execute();
        expect(result).toBe(InputData)
        expect(mockGetProductsFun).toBeCalledTimes(1)
    });
});