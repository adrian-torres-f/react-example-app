"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Users, Home, FolderOpen, Info } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Inicio",
      href: "/",
      icon: Home,
      current: pathname === "/",
    },
    {
      name: "Usuarios",
      href: "/users",
      icon: Users,
      current: pathname.startsWith("/users"),
    },
    {
      name: "Productos",
      href: "/products",
      icon: Info,
      current: pathname.startsWith("/products"),
    },
    {
      name: "Nosotros",
      href: "/about",
      icon: Info,
      current: pathname === "/about",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <FolderOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">InsigProjects</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                      item.current ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex">
              <Link href="/users">
                <Users className="h-4 w-4 mr-2" />
                Gestionar Usuarios
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden pb-4">
          <div className="flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                    item.current ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}
