# 📝 Todo App - Fullstack con Docker, Prisma, Express y React

Este proyecto es una aplicación **Fullstack** que permite registrar usuarios, iniciar sesión, y gestionar tareas (crear, completar y eliminar).  <br>
Fue creado con el objetivo de **aprender y entender mejor la comunicación entre frontend y backend**, combinando y adaptando **dos tutoriales de YouTube**.

---

## 🧩 Estructura del proyecto

- **Frontend** (`/client/todo-app4`): desarrollado con **React** usando Vite.
- **Backend** (`/server`): construido con **Express.js**, **Prisma ORM** y **PostgreSQL** como base de datos.  
- El servidor está **dockerizado**.

---

## 🛠 Tecnologías utilizadas

- React (Vite)
- Node.js
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- JWT (autenticación)

---

## 🧰 Requisitos previos

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente en tu equipo:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [Docker](https://www.docker.com/products/docker-desktop/)
- Conexión a internet — requerida para descargar dependencias y generar el cliente Prisma
- (Opcional) [PostgreSQL CLI](https://www.postgresql.org/download/) para interactuar con la base de datos manualmente

---

## 🚀 ¿Cómo ejecutar el proyecto?

### 🔁 El backend y el frontend se ejecutan por separado.

---

## 🖥️ Frontend

1. Ve al directorio del frontend:
```
cd client/todo-app4
```

2. Instala las dependencias:
```
npm install
```

3. Ejecuta el servidor de desarrollo 
```
npm run dev
```

4. Visita http://localhost:5173 en tu navegador

💡 Contraseña mínima: 6 caracteres, primero corre el backend.

## 🐳 Backend (Dockerizado)

🔗 Basado en este proyecto original:
https://github.com/jamezmca/backend-full-course/blob/main/chapter_4/README.md

Archivos importantes:
- Dockerfile
- docker-compose.yaml
- schema.prisma

✅ Recomendado: Ejecuta estos pasos desde la terminal integrada en Docker Desktop o desde una terminal con Docker correctamente instalado y configurado en tu sistema.

⚙️ Pasos para ejecutarlo:

1. Entra al directorio del backend
```
cd Proyecto4/server
```

2. Genera el cliente de Prisma
```
npx prisma generate
```

3. Construye las imágenes de Docker
```
docker compose build
```

4. Crea y aplica las migraciones de la base de datos
```
docker compose run app npx prisma migrate dev --name init
```

5. Levanta los contenedores (solo si ya están construidos)
```
docker compose up
```

6. (Opcional)  Ingresa a la base de datos PostgreSQL desde Docker (nueva terminal):
```
docker exec -it postgres-db4 psql -U postgres -d todoapp4
```

7. Detén los contenedores
```
docker compose down
```

🧪 Comandos útiles dentro de PostgreSQL

- Ver tablas:
```
\dt
```

- Ver contenido de la tabla Todo:
```
SELECT * FROM "Todo";
```

- Salir:
```
\q
```

---

🧑‍💻 Cómo se usa

1. Regístrate con un email y contraseña (mínimo 6 caracteres).
2. Inicia sesión.
3. Crea nuevas tareas.
4. Márcalas como completadas o elimínalas.
5. Cierra sesión con el botón SIGN OUT.

---

📌 Notas adicionales
- El backend escucha en http://localhost:5005
- El frontend escucha en http://localhost:5173
- La comunicación está protegida con JWT. El token se almacena en cookies y se incluye en los headers.

