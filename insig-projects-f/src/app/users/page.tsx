"use client"

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AddUserDialog } from "@/components/users/add-user-dialog";
import { SearchUsers } from "@/components/users/search-users";
import { UserCard } from "@/components/users/user-card";
import { deleteUser, getUsersPaged } from "@/lib/users/api";
import { UserItemRs } from "@/lib/users/user";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner"

export default function UsersPage() {
  const [users, setUsers] = useState<UserItemRs[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getUsersPaged(currentPage, 6, searchQuery)
      setUsers(res.data?.users ?? [])
      setTotalPages(res.data?.totalPages ?? 1)
    } catch (error) {
      toast.error("Error",{description:"No se pudieron cargar los usuarios."})
      console.error("Error loading users:", error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchQuery])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id)
      toast.success("Usuario eliminado exitosamente.")
      loadUsers()
    } catch (error) {
      toast.error("No se pudo eliminar el usuario.")
      console.error("Error loading users:", error)
    }
  }

  const handleUserAdded = () => {
    loadUsers()
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-rose-600" />
            <h1 className="text-xl md:text-3xl font-bold text-rose-900 dark:text-rose-100">Gestión de Usuarios</h1>
          </div>
          <p className="text-xs md:text-sm text-rose-600 dark:text-rose-400">Administra usuarios y sus proyectos de manera eficiente</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchUsers onSearch={handleSearch} isLoading={loading} />
          </div>
          <AddUserDialog onUserAdded={handleUserAdded} />
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        ) : users && users.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {users.map((user) => (
                <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-rose-200 text-rose-700 dark:text-rose-100 hover:bg-rose-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={
                        page === currentPage
                          ? "bg-rose-500 hover:bg-rose-600 text-white"
                          : "border-rose-200 text-rose-700 dark:text-rose-100 hover:bg-rose-50"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-rose-200 text-rose-700 dark:text-rose-100 hover:bg-rose-50"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-rose-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-200 mb-2">
              {searchQuery ? "No se encontraron usuarios" : "No hay usuarios registrados"}
            </h3>
            <p className="text-rose-600 dark:text-rose-400 mb-4">
              {searchQuery ? "Intenta con otros términos de búsqueda" : "Comienza agregando tu primer usuario"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}