# 🛠️ Notas para desarrolladores

Este documento tiene como propósito explicar la arquitectura interna del proyecto, sus buenas prácticas, estructura en capas y recomendaciones para desarrollo y mantenimiento del backend de **insig-project-b**.

---

## 📦 Estructura general del proyecto

La arquitectura del proyecto sigue un patrón modular basado en capas, que permite mantener una separación clara de responsabilidades y facilita la escalabilidad.

---

## 🧱 Capas del backend

Cada módulo (por ejemplo, `user` o `project`) está organizado en capas:

| Capa         | Descripción |
|--------------|-------------|
| **Controller** | Maneja las rutas y recibe las solicitudes del cliente. Llama al servicio correspondiente y devuelve la respuesta. |
| **Service** | Contiene la lógica de negocio. Valida, transforma datos y decide qué repositorio usar. |
| **Repository** | Interactúa con la base de datos usando Prisma. Define consultas y operaciones CRUD. |
| **DTOs** | Define los tipos de datos que se reciben y devuelven en cada endpoint. |
| **Mapper** | Convierte modelos de base de datos a DTOs de respuesta (y viceversa si aplica). |

> 🧠 Esta separación permite mantener el código limpio, testeable y fácil de mantener.

---

## 🔀 Estructura de la API

- **Base URL**: `/api/v1/`
- Agrupación por recurso:
  - `/users`
  - `/projects`

Todos los endpoints retornan una estructura estándar de respuesta basada en la siguiente interfaz:

```ts
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data?: T;
  error?: { field: string; message: string }[];
}
```

Esto asegura consistencia en todas las respuestas de la API.

---

## 📊 Códigos de estado HTTP comunes

| Código | Descripción                          |
|--------|--------------------------------------|
| `200 OK` | Solicitud exitosa                   |
| `201 Created` | Recurso creado exitosamente     |
| `400 Bad Request` | Datos inválidos o mal formateados |
| `404 Not Found` | Recurso no encontrado         |
| `500 Internal Server Error` | Error inesperado del servidor |

> ❗ Es importante retornar siempre el código correcto según la operación para facilitar el trabajo del frontend y herramientas externas.

--- 

## 🧪 Validaciones
Se usa `express-validator` junto con middlewares personalizados para validar la entrada de los usuarios. Las funciones como `userCreateRq()` o `projectUpdateRq()` se encuentran en cada módulo y definen reglas específicas.

---

## 🧩 Prisma ORM
El acceso a la base de datos se realiza con Prisma:
- El cliente se instancia desde `@prisma/client`.
- Las migraciones se gestionan con `npx prisma migrate ...`.
- El esquema está definido en `/prisma/schema.prisma`.

> 🧩 Importante: ejecutar `npx prisma generate` si se modifica el esquema.

---

## 💡 Recomendaciones
🔁 Reutiliza lógica común dentro de utils/ para evitar duplicación.

- 🧪 Agrega pruebas unitarias cuando añadas nuevas funciones de negocio.
- 🚫 Evita lógica de negocio en controladores. Mantén los controllers livianos.
- 🧱 Crea nuevos módulos siguiendo la misma estructura (controller, service, repository, etc).
- 🗂️ Organiza los DTOs en una carpeta dtos/ por módulo.

### 📄 [⬅️ Volver al README principal](../README.md)