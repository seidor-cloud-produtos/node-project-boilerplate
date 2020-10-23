import 'reflect-metadata';
import app from './app';

import connect from './database/connection/connection';
import './containers';

const PORT = process.env.PORT || 3000;

async function startServer() {
    connect();

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Service running on port ${PORT}`);
    });
}

startServer();
