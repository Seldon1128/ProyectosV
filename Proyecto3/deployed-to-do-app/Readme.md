# ✅ To-Do App (con Autenticación y PostgreSQL)

Una aplicación web de tareas (To-Do) construida con **React**, **Node.js** y **PostgreSQL**, que permite:
- Crear, editar y eliminar tareas.
- Guardar el progreso con una barra visual.
- Autenticarse mediante email y contraseña.
- Almacenar datos en una base de datos PostgreSQL local.

Desarrollamos este proyecto siguiendo el siguiente video: https://www.youtube.com/watch?v=LYEkguL9PcY 
---

## 🚀 Cómo correr el proyecto

### 1. Clona este repositorio

### 2. Instala dependencias

#### En el directorio raíz (servidor):
```bash
cd server
npm install
```

#### En el cliente (frontend):
```bash
cd ../client
npm install
```

### 3. Configura la base de datos

### 4. Corre el servidor backend

```bash
cd ../server
npm run start
```

### 5. Corre la app frontend

```bash
cd ../client
npm run start
```

Esto corre el frontend en http://localhost:3000

---

## 🛠️ Configuración de la base de datos (PostgreSQL)

### Asegúrate de tener PostgreSQL instalado

```bash
psql --version
```

Si no lo tienes, puedes instalarlo con Homebrew:

```bash
brew install postgresql@14
brew services start postgresql@14
```

### Crea la base de datos

```bash
createdb todoapp
```

### Entra a la consola de PostgreSQL

```bash
psql todoapp
```

### Crea las tablas necesarias

```sql
CREATE TABLE todos(
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);
```

Puedes verificar con:

```sql
\d
```

---

## 📦 Consultas básicas

### Ver todas las tareas:
```sql
SELECT * FROM todos;
```

### Agregar una tarea:
```sql
INSERT INTO todos(id, user_email, title, progress, date)
VALUES('0', 'test@gmai.com', 'First todo', 10, '2025-06-23');
```

### Ver usuarios registrados:
```sql
SELECT * FROM users;
```

---

## 🌐 Acceso a PostgreSQL desde terminal

```bash
psql todoapp
```

Una vez dentro puedes usar:

- `\d` → Ver tablas
- `\q` → Salir
- `SELECT * FROM tabla;` → Consultar datos
- `INSERT INTO ...` → Agregar datos
- `DELETE FROM ...` → Eliminar registros

---

## 📁 Estructura del proyecto

```
deployed-to-do-app/
├── client/        → Aplicación React
├── server/        → Servidor Node.js + Express
├── package.json
```

---

## 🔐 Autenticación

- Autenticación por email y contraseña.
- Contraseñas cifradas con **bcrypt**.
- Tokens JWT almacenados en cookies con `react-cookie`.

---

## 💡 Notas

- Asegúrate de que el backend esté corriendo antes de iniciar el cliente.
- El backend debe estar en `http://localhost:8000`.

---
