# 🛠️ Backend moderno con TypeScript, Express y Prisma

Esta guía te ayudará a crear un backend desde cero usando tecnologías modernas como:
- **TypeScript** para tipado estático
- **Express** para construir APIs REST
- **Prisma** como ORM conectado a PostgreSQL
- **CommonJS** como módulo de compilación (ideal para Node.js)

Ideal para proyectos escalables, limpios y organizados. Esta guía parte desde cero y termina con un servidor en marcha.

---

## ✅ Requisitos previos

Asegúrate de tener instalados:

- Node.js (v18 o superior)
- npm
- PostgreSQL (con una base de datos ya creada)
- Git Bash o terminal de tu preferencia
- Visual Studio Code (u otro editor con soporte para TypeScript)

---

## 📁 Paso 1: Estructura inicial del proyecto

### 1. Crear carpeta del proyecto
```bash
mkdir backend-ts
cd backend-ts
```

### 2. Inicializar proyecto Node.js
```bash
npm init -y
```

### 3. Definir tipo de módulos (CommonJS)
Asegúrate de que tu `package.json` contenga:
```json
{
  "type": "commonjs"
}
```

---

## 🧩 Paso 2: Configuración de TypeScript

### 1. Instalar dependencias necesarias
```bash
npm install express @prisma/client cors express-validator
npm install -D typescript ts-node-dev prisma @types/express@5 @types/node @types/cors
```

### 2. Inicializar TypeScript
```bash
npx tsc --init
```

### 3. Configuración recomendada (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src"]
}
```

---

## 🌐 Paso 3: Crear servidor Express básico

### 1. Crear estructura de carpetas
```bash
mkdir src
touch src/index.ts
```

### 2. Código base para `index.ts`
```ts
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("✅ Servidor Express funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
```

### 3. Agregar scripts al `package.json`
```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

### 4. Ejecutar servidor en modo desarrollo
```bash
npm run dev
```

---

## 🧬 Paso 4: Configurar Prisma con PostgreSQL

### 1. Inicializar Prisma
```bash
npx prisma init
```
Esto creará:
- `prisma/schema.prisma`
- `.env`

### 2. Editar archivo `.env` con la conexión a PostgreSQL
```.env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos?schema=public"
```

### 3. Definir esquema inicial en `schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

### 4. Ejecutar migración
```bash
npx prisma migrate dev --name init
```

### 5. Crear archivo cliente Prisma
```ts
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;
```

### 6. Ejemplo de uso
```ts
import express from "express";
import prisma from "./lib/prisma";

const app = express();
app.use(express.json());

app.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log("Servidor en ejecución 🚀");
});
```

---

## 🧪 Scripts disponibles

| Comando        | Descripción                                           |
|----------------|-------------------------------------------------------|
| `npm run dev`  | Ejecuta el servidor en modo desarrollo  |
| `npm run build`| Compila el proyecto TypeScript a JavaScript          |
| `npm start`    | Inicia el servidor desde la carpeta `dist`           |

---

## 🧭 Próximos pasos para tí

- Añadir rutas organizadas por módulos
- Incorporar controladores, servicios y repositorios
- Agregar middlewares y validaciones
- Documentar la API (docs/api.md)