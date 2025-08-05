# 🛠️ Notas para desarrolladores

Este documento describe la arquitectura interna del frontend de **insig-projects-f**, así como la estructura modular y recomendaciones para desarrollo y mantenimiento del código.

---

## 📦 Estructura general del proyecto

La arquitectura está organizada siguiendo principios de modularidad y separación de responsabilidades. El diseño se enfoca en mantener los componentes reutilizables, separar la lógica del layout, validación, consumo de API, y estilos.

---

## 🧱 Estructura por módulo (users, projects)

Cada módulo (como `users` o `projects`) está estructurado en tres áreas principales:

| Área       | Ubicación       | Función                                                       |
|------------|------------------|---------------------------------------------------------------|
| **Lib**    | `lib/users/`     | Contiene funciones de API, esquemas de validación con Zod e interfaces para definir datos recibidos del backend. |
| **Componentes** | `components/users/` | Visualización: `Card`, `Search`, `Dialog`, tablas, etc. Estos componentes son reutilizables y responsivos. |
| **App Pages** | `app/users/`     | Composición de la página completa (layout + componentes + lógica de presentación). |

> ⚙️ Esto facilita escalar módulos sin mezclar lógica visual con lógica de negocio.

---

## 📬 Comunicación con el backend

Se usan funciones de `fetch` encapsuladas en `lib/`, retornando respuestas con una estructura estandarizada:

```ts
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data?: T;
  error?: { field: string; message: string }[];
}
```
> Las respuestas son interpretadas para mostrar toasts, errores en formularios o redirecciones.

---

## ✅ Validaciones con Zod
Los formularios utilizan React Hook Form en combinación con Zod para validaciones en el cliente.
- Los esquemas de validación se encuentran en `lib/users/user.schema.ts` o similares.
- Los errores se muestran dinámicamente debajo de los campos.
- La estructura de los formularios es completamente tipada y segura.

----

## 🎨 Componentes y UI
Se utiliza la librería ShadCN UI para la creación de componentes accesibles, bien diseñados y listos para el tema oscuro/claro.

- Están ubicados en `components/ui/`.
- Pueden ser extendidos o personalizados según necesidad.
- Se integran fácilmente con formularios, modales, tabs, cards, toasts, etc.

---

## 🌗 Temas: modo claro y oscuro
El sistema de temas está integrado en el layout principal (`layout.tsx`) y controlado mediante el componente `ThemeToggle`.

- Se basa en clases de Tailwind como `dark:bg-zinc-900`.
- Persistencia automática con `localStorage` para recordar la preferencia del usuario.

---

## 🔄 Composición de páginas
Las páginas dentro de `app/` son responsables de:

- Cargar datos mediante funciones de `lib/`.
- Componer y orquestar componentes visuales.
- Manejar eventos del usuario (como crear, editar, eliminar registros).
- Validar formularios y mostrar notificaciones.

> No se recomienda colocar lógica pesada directamente en los componentes visuales. Mantener la lógica desacoplada dentro de lib/.

---

## 💡 Recomendaciones

- 🧩 Usa `Skeletons` y `Loaders` para mejorar la UX en páginas dinámicas.
- 📦 Usa `sonner` para mostrar notificaciones no invasivas.
- ⚠️ Maneja errores correctamente desde la API para mostrar mensajes útiles al usuario.
- 📁 Mantén una estructura por módulos: si agregas `tasks`, sigue el mismo patrón de `users` y `projects`.

### 📄 [⬅️ Volver al README principal](../README.md)