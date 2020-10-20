import swaggerJSDoc, { SwaggerDefinition, Options } from 'swagger-jsdoc';

const swaggerDefinition = {
    info: {
        title: 'API Generic Service',
        version: '1.0.0',
    },
    host: process.env.HOST || 'localhost:3000',
    basePath: '/',
} as SwaggerDefinition;

const options = {
    swaggerDefinition,
    apis: ['./dist/routes/index.js'],
} as Options;

const swaggerSpec = swaggerJSDoc(options) as SwaggerDefinition;

export { swaggerSpec };
