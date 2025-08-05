"use client"

import { Mail, Trash2, Calendar, FolderOpen } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Link from "next/link";
import { UserItemRs } from "@/lib/users/user";

interface UserCardProps {
  user: UserItemRs
  onDelete: (id: number) => void
}

export function UserCard({ user, onDelete }: UserCardProps){
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete(user.id)
  }
  return (
    <Link href={`/users/${user.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer
                      border-primary/20 hover:border-primary/40
                      bg-gradient-to-br from-primary/5 to-accent/10
                      dark:border-primary/30 dark:hover:border-primary/50
                      dark:from-primary/10 dark:to-accent/20
                      dark:bg-card/90">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 flex-1 min-w-0">
              <CardTitle className="text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1 pr-2">
                {user.name}
              </CardTitle>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">
                <Mail className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
            
            {/* Botón delete: Siempre visible en móvil/tablet, hover en desktop */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity
                        text-destructive/70 hover:text-destructive
                        hover:bg-destructive/10 dark:hover:bg-destructive/20
                        h-8 w-8 p-0 flex-shrink-0"
              title="Eliminar usuario"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">
                {new Date(user.createdAt).toLocaleDateString("es-ES", {
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit'
                })}
              </span>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <FolderOpen className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70 group-hover:text-primary transition-colors" />
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20
                          dark:bg-primary/20 dark:text-primary dark:border-primary/30
                          group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors
                          text-xs px-2 py-0.5 whitespace-nowrap"
              >
                {user.projects} {user.projects === 1 ? 'proyecto' : 'proyectos'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}