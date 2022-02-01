# Build
```
make build
# or
docker-compose build
```
# Run Server
Le serveur permet de communiquer avec un front et d'afficher des infos ou des graphs

## Dev
With watch cmd for startUpdating changes
```
make dev
# or
docker-compose up -d
```
Go to localhost:49160
## Prod
```
make prod
# or
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

# Run bot

Run bash in the docker container
```
make cmd
# or
docker exec -ti astro_server bash
```

then exec the bot
```
npm run bot
```

# Tools

## Make
GNU Make 3.81
