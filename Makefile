up:
	docker-compose up
upd:
	docker-compose up -d
updb:
	docker-compose up -d db mongo
down:
	docker-compose down
logs:
	docker-compose logs app
test:
	docker-compose run app npm test
m\:run:
	docker-compose run app npm run typeorm migration:run
m\:clean-database:
	docker-compose run app npm run clean-database
