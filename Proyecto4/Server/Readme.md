Readme 

Link del Readme al Proyecto original -> https://github.com/jamezmca/backend-full-course/blob/main/chapter_4/README.md

Los archivos que se toman en cuenta para correr el programa dockerizado son:
- Dockerfile
- docker.compose.yaml
- schema.prisma

1. Generate the prisma Client:

npx prisma generate

2. Build your docker images:  !!Desde aquí comenzamos si borramos los contenedores!!

docker compose build

3. Create PostgreSQL migrations and apply them:

docker compose run app npx prisma migrate dev --name init

4. Boot up 2x docker containers: !!Solo se corre esto si solo los pare!!

docker compose up

5. To login to docker PostgreSQL database (from a new terminal instance while docker containers are running) where you can run SQL commands and modify database!:

docker exec -it postgres-db psql -U postgres -d todoapp

6. To stop Docker containers:

docker compose down

7. To delete all docker containers:

docker system prune

--------
--------

Adentro de la terminar de database postgree

\dt -> Muestra todas las tablas
SELECT * FROM "Todo"; -> Ejemplo de comando sql
\q -> salir
