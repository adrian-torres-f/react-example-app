
# 🎨 insig-projects-f

Frontend del proyecto **Insig Projects**, encargado de la interfaz de usuario e interacción con la API REST del backend. Esta aplicación fue construida con un stack moderno basado en **Next.js**, **Tailwind CSS**, **TypeScript** y **ShadCN UI** para lograr un desarrollo ágil, accesible y mantenible.

La interfaz implementa un sistema de diseño adaptable, modo **oscuro/claro**, y páginas ricas en interacción con soporte para validaciones, toasts de notificación, y componentes reutilizables.

---

## 🚀 Tecnologías utilizadas

- [Next.js (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [Zod (validación de formularios)](https://zod.dev/)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Vercel](https://vercel.com/) (para despliegue)

> IDE recomendado: [Visual Studio Code](https://code.visualstudio.com/)

---

## 🛠️ Configuración del proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar las variables de entorno
Crea un archivo .env.development en la raíz del proyecto con las siguientes variables (ajústala según tu configuración):

```.env
NEXT_PUBLIC_API_BASE_URL=https://insig-projects-b.vercel.app/
NEXT_PUBLIC_API_V1_URL=https://insig-projects-b.vercel.app/api/v1
```

## 🧪 Scripts disponibles

| Comando        | Descripción                                           |
|----------------|-------------------------------------------------------|
| `npm run dev`  | Ejecuta el servidor en modo desarrollo               |
| `npm run build`| Compila el proyecto para producción                  |
| `npm start`    | Inicia el servidor en producción                     |

## 🌐 Páginas implementadas
- `/` Página principal (home) con diseño responsivo.
- `/about` Página "Sobre nosotros".
- `/users` Permite gestionar usuarios y sus proyectos.

Componentes como card, dialog, dropdown, input, skeleton, entre otros ya están integrados desde ShadCN.

---

## 📚 Documentación adicional

- 📘 [Guía para crear un proyecto desde cero](./docs/setup.md)
- 🛠️ [Notas para desarrolladores](./docs/dev-notes.md)

---

## 👨‍💻 Autor

Elaborado por **Dario Quispe**  
🔗 [https://github.com/Minkaspr](https://github.com/Minkaspr)

