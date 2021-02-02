import path from 'path';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createConnections, Connection } from 'typeorm';

dotenv.config();

export default async (isTesting = false): Promise<Connection[]> => {
    let mongoPort = Number(process.env.MONGO_PORT);
    let mongoDatabase = process.env.MONGO_DBNAME;

    if (process.env.CURRENT_ENVIROMENT === 'DEV' || isTesting) {
        const mongo_data = new MongoMemoryServer();

        mongoPort = await mongo_data.getPort();
        mongoDatabase = await mongo_data.getDbName();
    }

    if (isTesting) {
        const connections = await createConnections([
            {
                name: 'default',
                type: 'sqlite',
                database: ':memory:',
                migrationsRun: isTesting,
                synchronize: isTesting,
                entities: [`${path.resolve(__dirname, '../entities')}/*.{ts,js}`],
            },
            {
                name: 'mongo',
                type: 'mongodb',
                host: '127.0.0.1',
                port: +mongoPort!,
                database: mongoDatabase,
                useUnifiedTopology: true,
                entities: [`${path.resolve(__dirname, '../schemas')}/*.{ts,js}`],
            },
        ]);

        for (let index = 0; index < connections.length; index += 1) {
            await connections[index].runMigrations();
        }

        return connections;
    }

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
            port: mongoPort,
            database: mongoDatabase,
            useUnifiedTopology: true,
            entities: [`${path.resolve(__dirname, '../entities')}/*.{ts,js}`],
        },
    ]);
};
