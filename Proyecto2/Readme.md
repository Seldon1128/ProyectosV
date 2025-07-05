# 🐳 Proyecto Backend Dockerizado – Todo App + Prisma + PostgreSQL

🔗 Basado en el proyecto original: https://github.com/jamezmca/backend-full-course/blob/main/chapter_4/README.md

Este backend utiliza Node.js, Prisma, PostgreSQL y está totalmente dockerizado para facilitar su ejecución y despliegue. Fue desarrollado como parte de un ejercicio práctico para mejorar la comprensión de la conexión entre frontend y backend.

---

## 🧰 Requisitos Previos:
- Docker
- Node.js versión 22 o superior
- PostgreSQL

---

## 🚀 ¿Cómo ejecutar el proyecto?

Recomendado: Ejecuta estos comandos desde una terminal con Docker instalado o desde la Terminal de Docker Desktop.

1. Ubícate en el directorio del proyecto backend:
```bash
cd Proyecto2
```

2. Genera el cliente de Prisma:

```bash
npx prisma generate
```

3. Construye las imágenes de Docker:
```bash
docker compose build
```

4. Crea y aplica las migraciones de la base de datos:
```bash
docker compose run app npx prisma migrate dev --name init
```

5. Levanta los contenedores de Docker
```bash
docker compose up
```

6. Detener los contenedores:
```bash
docker compose down
```

----

## 💡 Notas

- El programa debe estar en localhost:5003