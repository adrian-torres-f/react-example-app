# 🛠️ Frontend moderno con Next.js, TypeScript y Tailwind CSS

Esta guía te ayudará a crear un proyecto frontend desde cero utilizando tecnologías modernas como:

- **Next.js** para renderizado híbrido y estructura basada en componentes
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos utilitarios rápidos y mantenibles
- **App Router** como sistema de rutas moderno de Next.js
- **ESLint** para mantener un código limpio y consistente

Ideal para construir aplicaciones web modernas, escalables y con buenas prácticas desde el inicio.

---

## ✅ Requisitos previos

Asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/)
- [Visual Studio Code](https://code.visualstudio.com/) u otro editor moderno
- [Git](https://git-scm.com/) (opcional pero recomendado)

---

## 📁 Paso 1: Crear el proyecto con Next.js

En la terminal, ejecuta:

```bash
npx create-next-app@latest
```

Responde a las preguntas de la siguiente manera:

| Pregunta                                         | Respuesta                       |
|--------------------------------------------------|---------------------------------|
| What is your project named?                     | `my-app` (o el nombre que desees) |
| Would you like to use TypeScript?               | ✅ Yes                          |
| Would you like to use ESLint?                   | ✅ Yes                          |
| Would you like to use Tailwind CSS?             | ✅ Yes                          |
| Would you like your code inside a `src/` dir?   | ✅ Yes                          |
| Would you like to use App Router?               | ✅ Yes                          |
| Would you like to use Turbopack for `next dev`? | ✅ Yes (opcional)               |
| Customize import alias?                         | ❌ No (se usará `@/*` por defecto) |

Esto creará una estructura de carpetas base como:

```
my-app/
├── public/
├── src/
│ ├── app/
│ ├── components/
│ ├── styles/
│ └── ...
├── tsconfig.json
├── next.config.js
└── package.json
```

## 🧩 Paso 2: Instalación de librerías adicionales (ShadCN UI + Zod)

### 1. Instalar y configurar ShadCN UI
En la raíz del proyecto, ejecuta:

```bash
npx shadcn-ui@latest init
```
Durante el asistente, responde con los valores por defecto o personaliza según tus preferencias. Por ejemplo:

| Pregunta                             | Respuesta sugerida     |
|--------------------------------------|--------------------------|
| Which color would you like...?       | `Neutral`                |
| Directory for components?            | `src/components`         |

✅ Este comando realiza lo siguiente:
- Añade utilidades a `src/lib/utils.ts`
- Instala dependencias como `clsx`, `tailwind-variants`, entre otras
- Modifica `src/app/globals.css` con las variables de ShadCN

### 2. Instalar Zod para validaciones de formularios
Zod permite definir y validar esquemas de datos de manera sencilla y segura.

```bash
npm install zod
```

Puedes combinarlo con otras librerías como react-hook-form o usarlo de forma independiente para validar inputs, formularios y estructuras complejas.

---

#### 💅 Componentes ShadCN instalados
Para este proyecto se han instalado los siguientes componentes personalizados de ShadCN/UI:

- Badge
- Button
- Card
- Dialog
- DropdownMenu
- Input
- Label
- Select
- Skeleton
- Sonner (para notificaciones)
- Textarea

Estos componentes están ubicados en:

```bash
src/components/ui/
```

#### 🧩 Cómo instalar un componente ShadCN
Si deseas agregar un nuevo componente más adelante, puedes usar el siguiente comando:

```bash
npx shadcn@latest add <componente>
```
Por ejemplo, para instalar el componente button:

```bash
npx shadcn@latest add button
```

---

## 📦 Paso 3: Variables de entorno

Para que tu aplicación funcione correctamente con el backend, necesitas definir variables de entorno en los archivos:

- `.env.development` para entorno local
- `.env.production` para entorno en producción

Agrega las siguientes variables en ambos archivos:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_API_V1_URL=http://localhost:4000/api/v1
```
> ✅ Usa el prefijo NEXT_PUBLIC_ para que Next.js pueda acceder a estas variables desde el frontend.

---

## 🧪 Scripts disponibles

| Comando         | Descripción                                 |
|------------------|---------------------------------------------|
| `npm run dev`    | Ejecuta el servidor en modo desarrollo      |
| `npm run build`  | Compila el proyecto para producción         |
| `npm start`      | Inicia el servidor en modo producción       |


### 📄 [⬅️ Volver al README principal](../README.md)