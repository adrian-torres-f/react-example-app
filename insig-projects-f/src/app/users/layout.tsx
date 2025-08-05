import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gestión de Usuarios", 
  description: "Administra usuarios y sus proyectos de manera eficiente",
}

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</> 
}