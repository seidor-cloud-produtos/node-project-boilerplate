# node-project-boilerplate

Boilerplate of a NodeJS project using our latest patterns

## technologies

-   typescript
-   typeorm
-   postgres
-   express
-   express-validator (validação das rotas)
-   AVA (tests)

## scripts

-   test - run ava tests
-   build - compile project
-   start- run compiled project
-   dev - run development server with hot reload
-   typeorm - same as npx typeorm
-   m:run - run migrations
-   m:generate - generate a migration

## docker support

```bash
docker build -t seidor-cloud-produtos/node-project-boilerplate .
docker run --rm -p 3000:3000 seidor-cloud-produtos/node-project-boilerplate
```

## docker-compose support

**make** runs docker-compose commands under the hood

```bash
make up
make down
```

See Makefile for aditional commands.
