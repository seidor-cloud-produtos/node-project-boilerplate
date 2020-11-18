# node-project-boilerplate

Boilerplate of a NodeJS project using our latest patterns.

## technologies

-   typescript
-   typeorm
-   postgres
-   mongodb
-   express
-   yup
-   jest

## scripts

-   test - run ava tests
-   build - compile project
-   start- run compiled project
-   dev - run development server with hot reload
-   typeorm - same as npx typeorm
-   m:run - run migrations
-   m:generate - generate a migration
-   clean-database - drop database and run migrations

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

## run tests

```shell
make test
```

or a more manual approach. Create .env file with this contents:

```text
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=genericservice

MONGO_HOST=localhost
MONGO_PORT=27107
MONGO_DBNAME=genericservice
```

Then run:

```shell
make updb
npm test
```


