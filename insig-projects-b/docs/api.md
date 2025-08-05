# 📘 Documentación de la API 

Todas las respuestas siguen el formato estándar:

```json
{
  "status": "success",
  "message": "Descripción del resultado",
  "data": { ... },
  "error": [ ... ]
}
```

---

## Módulo de Usuarios

Base URL: `/api/v1/users`

### 🔹 Crear usuario

POST `/`
Crea un nuevo usuario.

- Body (JSON)
```json
{
  "firstName": "Juan",
  "lastName": "Perez",
  "email": "juan.perez@example.com"
}
```

- Response 201
```json
{
  "status": "success",
  "message": "Usuario creado exitosamente",
  "data": {
    "id": 1,
    "firstName": "Juan",
    "lastName": "Perez",
    "email": "juan.perez@example.com",
    "createdAt": "2025-08-04T00:00:00.000Z"
  }
}
```

---

### 🔹 Obtener todos los usuarios

GET `/`
Retorna la lista completa de usuarios.

- Response 200
```json
{
  "status": "success",
  "message": "Usuarios obtenidos correctamente",
  "data": [ ... ]
}
```

---

### 🔹 Obtener usuarios paginados

GET `/paginated?page=1&limit=10&search=juan`
Devuelve los usuarios paginados y opcionalmente filtrados por nombre.

- Query Params:
  - `page` (opcional): número de página (default: `1`)
  - `limit` (opcional): elementos por página (default: `10`)
  - `search` (opcional): término de búsqueda

- Response 200
```json
{
  "status": "success",
  "message": "Usuarios paginados obtenidos correctamente",
  "data": {
    "items": [ ... ],
    "total": 24,
    "page": 1,
    "limit": 10
  }
}
```

---

### 🔹 Obtener usuario por ID

GET `/:id`
- Path Param:
  - `id`: ID del usuario

- Response 200
```json
{
  "status": "success",
  "message": "Usuario encontrado",
  "data": {
    "id": 1,
    "firstName": "Juan",
    "lastName": "Perez",
    "email": "juan.perez@example.com",
    "createdAt": "2025-08-04T00:00:00.000Z"
  }
}
```

---

### 🔹 Obtener proyectos de un usuario

GET `/:id/projects?page=1&limit=10`
Retorna los proyectos relacionados al usuario especificado.

- Query Params:
  - `page` (opcional)
  - `limit` (opcional)

- Response 200
```json
{
  "status": "success",
  "message": "Proyectos del usuario obtenidos correctamente",
  "data": {
    "items": [ ... ],
    "total": 5,
    "page": 1,
    "limit": 10
  }
}
```

---

### 🔹 Actualizar usuario

PUT `/:id`
Actualiza los datos del usuario.

- Path Param:
  - `id`: ID del usuario

- Body (JSON)
```json
{
  "firstName": "Nuevo nombre",
  "lastName": "Nuevo apellido"
}
```

- Response 200
```json
{
  "status": "success",
  "message": "Usuario actualizado correctamente",
  "data": { ... }
}
```

---

### 🔹 Eliminar usuario

DELETE `/:id`
Elimina al usuario especificado.

- Path Param:
  - `id`: ID del usuario

- Response 200

```json
{
  "status": "success",
  "message": "Usuario eliminado correctamente",
  "data": { ... }
}
```

---

## Módulo de Proyectos

Base URL: `/api/v1/projects`

### 🔹 Crear proyecto

POST `/`
Crea un nuevo proyecto.

- Body (JSON)
```json
{
  "title": "Nuevo Proyecto",
  "description": "Descripción del proyecto",
  ...,
  "userId": 1
}
```

- Response 201
```json
{
  "status": "success",
  "message": "Proyecto creado exitosamente",
  "data": {
    "id": "proj_abc123",
    "title": "Nuevo Proyecto",
    "description": "Descripción del proyecto",
    ...,
    "userId": 1,
    "createdAt": "2025-08-04T00:00:00.000Z"
  }
}
```

---

### 🔹 Obtener todos los proyectos

GET `/`
Retorna la lista completa de proyectos.

- Response 200
```json
{
  "status": "success",
  "message": "Proyectos obtenidos correctamente",
  "data": [ ... ]
}
```

---

### 🔹 Obtener proyectos paginados

GET `/paginated?page=1&limit=10`
Devuelve los proyectos paginados.

-Query Params:
  - `page` (opcional): número de página (default: `1`)
  - `limit` (opcional): elementos por página (default: `10`)

- Response 200
```json
{
  "status": "success",
  "message": "Proyectos paginados obtenidos correctamente",
  "data": {
    "items": [ ... ],
    "total": 24,
    "page": 1,
    "limit": 10
  }
}
```

---

### 🔹 Obtener proyecto por ID

GET `/:id`

- Path Param:
  - `id`: ID del proyecto

- Response 200
```json
{
  "status": "success",
  "message": "Proyecto encontrado",
  "data": {
    "id": "proj_abc123",
    "title": "Nuevo Proyecto",
    "description": "Descripción del proyecto",
    ...,
    "userId": 1,
    "createdAt": "2025-08-04T00:00:00.000Z"
  }
}
```

---

### 🔹 Actualizar proyecto

PUT `/:id`
Actualiza un proyecto existente.

- Path Param:
  - `id`: ID del proyecto

- Body (JSON)
```json
{
  "title": "Proyecto actualizado",
  "description": "Nueva descripción"
}
```

- Response 200
```json
{
  "status": "success",
  "message": "Proyecto actualizado correctamente",
  "data": { ... }
}
```

---

### 🔹 Eliminar proyecto

DELETE `/:id`
Elimina un proyecto por ID.

- Path Param:
  - `id`: ID del proyecto

- Response 200
```json
{
  "status": "success",
  "message": "Proyecto eliminado correctamente",
  "data": { ... }
}
```

---

## ⚠️ Validación de errores
Si la solicitud contiene errores de validación, se responderá con:

```json
{
  "status": "error",
  "message": "Datos inválidos",
  "error": [
    {
      "field": "email",
      "message": "Debe ser un email válido"
    }
  ]
}
```

### 📄 [⬅️ Volver al README principal](../README.md)