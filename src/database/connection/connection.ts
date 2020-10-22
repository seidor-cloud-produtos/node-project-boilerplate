import path from 'path';
import dotenv from 'dotenv';
import { createConnections, Connection } from 'typeorm';

dotenv.config();

export default async (): Promise<Connection[]> => {
    return createConnections([
        {
            name: 'default',
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT!,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [`${path.resolve(__dirname, '../entities')}/*.{ts,js}`],
        },
        {
            name: 'mongo',
            type: 'mongodb',
            host: process.env.MONGO_HOST,
            port: +process.env.MONGO_PORT!,
            database: process.env.MONGO_DBNAME,
            useUnifiedTopology: true,
            entities: [`${path.resolve(__dirname, '../schemas')}/*.{ts,js}`],
        },
    ]);
};
