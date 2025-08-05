# 🧩 insig-projects-b

Backend del proyecto **Insig Projects**, encargado de la lógica del servidor y la persistencia de datos en una base de datos relacional mediante PostgreSQL.

Este repositorio contiene la configuración y estructura necesarias para levantar una API REST con Express, TypeScript y Prisma como ORM.

---

## 🚀 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

> IDE recomendado: [Visual Studio Code](https://code.visualstudio.com/)

---

## ✅ Requisitos mínimos

Antes de comenzar, asegúrate de tener instalado:

- Node.js v18 o superior
- PostgreSQL en ejecución (con una base de datos creada)
- VS Code u otro editor compatible
- Git (opcional, para control de versiones)

---

## 🛠️ Configuración del proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar las variables de entorno
Crea un archivo .env en la raíz del proyecto con la siguiente variable (ajústala según tu configuración):

```.env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/insigprojects"
PORT = 4000
ALLOWED_ORIGINS=http://localhost:3000,https://miapp.com
```

Asegúrate de crear previamente la base de datos llamada insigprojects (o el nombre que definas en la URL).

3. Ejecutar migraciones y generar el cliente Prisma
```bash
npx prisma migrate dev --name init
```
Esto creará las tablas en la base de datos y generará el cliente de Prisma para conectarte desde tu código.

## 🧪 Scripts disponibles

| Comando        | Descripción                                           |
|----------------|-------------------------------------------------------|
| `npm run dev`  | Ejecuta el servidor en modo desarrollo (hot-reload)  |
| `npm run build`| Compila el proyecto TypeScript a JavaScript          |
| `npm start`    | Inicia el servidor desde la carpeta `dist`           |

---

## 📚 Documentación adicional

- 📘 [Guía para crear un proyecto desde cero](./docs/setup.md)
- 📚 [Documentación de la API](./docs/api.md)
- 🛠️ [Notas para desarrolladores](./docs/dev-notes.md)

---

## 👨‍💻 Autor

Elaborado por **Dario Quispe**  
🔗 [https://github.com/Minkaspr](https://github.com/Minkaspr)