import { load } from "ts-dotenv";

const env = load({
    MONGO_DB_CONNECTION_STRING: { type: String, default: 'mongodb://localhost:27017' },
    JWT_SECRET: { type: String, default: 'secret' },
});

export const MONGO_DB_CONNECTION_STRING = env.MONGO_DB_CONNECTION_STRING;
export const JWT_SECRET = env.JWT_SECRET;