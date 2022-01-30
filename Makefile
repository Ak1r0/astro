dev:
	docker-compose up -d

prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

down:
	docker-compose down

build:
	docker-compose build

cmd:
	docker exec -ti astro_server bash
