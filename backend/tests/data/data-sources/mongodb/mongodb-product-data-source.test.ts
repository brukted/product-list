import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProductModel } from '../../../../src/data/data-sources/mongodb/models/product';
import { MongoDBProductDataSource } from '../../../../src/data/data-sources/mongodb/mongodb-product-data-source';

let mongoServer: MongoMemoryServer;

describe('MongoDB Product Data Source', () => {
    const mongoDbProductDataSource = new MongoDBProductDataSource();

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    beforeEach(async () => {
        await ProductModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    test('create data should be success', async () => {
        const expectedData = {
            title: 'title',
            price: 1,
            description: 'description',
            brand: 'brand',
            material: 'material',
            color: 'color',
            bannerImage: 'bannerImage',
            rating: 1,
        };
        const response = await mongoDbProductDataSource.create(expectedData);
        expect(response).toBe(true);
        const result = await ProductModel.find({});
        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('_id');
        expect(result[0]).toMatchObject(expectedData);
    });

    test('update data should be success', async () => {
        const expectedData = {
            title: 'title',
            price: 1,
            description: 'description',
            brand: 'brand',
            material: 'material',
            color: 'color',
            bannerImage: 'bannerImage',
            rating: 1,
        };
        const productModel = await new ProductModel(expectedData).save();
        const updatedData = { ...expectedData, title: 'updated title' };

        const response = await mongoDbProductDataSource.update({ ...updatedData, id: productModel.id!! });
        expect(response).toBe(true);

        const result = await ProductModel.find({});
        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('_id');
        expect(result[0]).toMatchObject(updatedData);
    });

    test('get all data should be success', async () => {
        const expectedData = {
            title: 'title',
            price: 1,
            description: 'description',
            brand: 'brand',
            material: 'material',
            color: 'color',
            bannerImage: 'bannerImage',
            rating: 1,
        };
        const productModel = new ProductModel(expectedData);
        const doc = await productModel.save();

        const result = await mongoDbProductDataSource.getAll();
        expect(result).toHaveLength(1);
        expect(result[0].id).toStrictEqual(doc._id);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toMatchObject(expectedData);
    });

    test('delete data should be success', async () => {
        const expectedData = {
            title: 'title',
            price: 1,
            description: 'description',
            brand: 'brand',
            material: 'material',
            color: 'color',
            bannerImage: 'bannerImage',
            rating: 1,
        };
        const productModel = new ProductModel(expectedData);
        const doc = await productModel.save();

        const response = await mongoDbProductDataSource.delete(doc._id);
        expect(response).toBe(true);

        const result = await ProductModel.find({});
        expect(result).toHaveLength(0);
    });
});