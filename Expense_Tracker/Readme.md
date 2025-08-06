# 💰 Expense Tracker (con Autenticación y PostgreSQL)

Aplicación web para gestionar transacciones construida con **React**, **Node.js** y **PostgreSQL**, que permite:
- Registrar ingresos y gastos.
- Ver el historial de transacciones filtrado por fecha o búsqueda.
- Mostrar saldo disponible por cuenta.
- Autenticación con usuarios y contraseñas.
- Almacenar toda la información en una base de datos PostgreSQL.

Desarrollamos este proyecto siguiendo el siguiente video: https://youtu.be/IIUyZjI6g24?si=VIKJYSRXmHLmerYK

---

## 🧰 Requisitos Previos:
- Node.js versión 22 o superior
- PostgreSQL

---

## 🚀 Cómo correr el proyecto

### 1. Clona este repositorio

### 2. Configura la base de datos

Sigue la sección 📦 Configuración de la base de datos más abajo para asegurarte de que PostgreSQL esté instalado, funcionando y con las tablas necesarias.

#### 3. Configura variables de entorno

En el archivo:
```bash
Expense_Tracker/backend/.env
```

Reemplaza las variables con un usuario válido en máquina:

```bash
USERNAME=tu_usuario_local
PASSWORD=tu_contraseña (puede estar vacía si no tiene)
```

### 3. Instala dependencias y corre el backend

```bash
cd Expense_Tracker/backend
npm install     # Instala las dependencias del backend
npm start   # Inicia el servidor en http://localhost:5010
```

### 4. Instala dependencias y corre el frontend

```bash
cd ../frontend
npm install     # Instala las dependencias del frontend
npm run dev   # Inicia la app React en http://localhost:3000
```
Esto abrirá la aplicación en http://localhost:5173

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
createdb expense_tracker
```

### Entra a la consola de PostgreSQL

```bash
psql expense_tracker
```

### Crea las tablas necesarias

```sql
CREATE TABLE tbluser(
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50),
    contact VARCHAR(15),
    accounts TEXT[],
    password TEXT,
    country TEXT,
    currency VARCHAR(5) NOT NULL DEFAULT 'USD',
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tblaccount(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES tbluser(id),
    account_name VARCHAR(50) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    account_balance NUMERIC(10,2) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tbltransaction(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES tbluser(id),
    description TEXT NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'Pending',
    source VARCHAR(100) NOT NULL,
    amount NUMERIC(10,2) NOT NULL, 
    type VARCHAR(10) NOT NULL DEFAULT 'income',
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Puedes verificar con:

```sql
\d
```

---

## 📦 Funcionalidad básica

- **Backend (Node.js + Express)** gestiona rutas de autenticación, cuentas y transacciones.
- **Frontend (React + Vite + Tailwind)** consume la API para mostrar y manejar datos.
- **Base de datos** en PostgreSQL para persistir toda la información.

---

## 📁 Estructura del proyecto

```
expense_tracker//
├── backend/        → Servidor Node.js + Express
├── frontend/       → Aplicación React + Vite

```

---

## 💡 Notas

- El backend debe estar corriendo antes de iniciar el frontend.
- Asegúrate de que las variables de entorno del backend apunten a tu base de datos expense_tracker.

---