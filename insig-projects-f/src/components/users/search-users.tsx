"use client"

import { Search, X } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface SearchUsersProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

export function SearchUsers({ onSearch, isLoading }: SearchUsersProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                         text-primary/60 dark:text-primary/70 h-4 w-4 
                         transition-colors" />
        <Input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 
                   border-primary/20 focus:border-primary/40 
                   bg-background dark:bg-card/80
                   dark:border-primary/30 dark:focus:border-primary/50
                   placeholder:text-muted-foreground
                   focus:ring-primary/20 dark:focus:ring-primary/30
                   transition-all duration-200"
          disabled={isLoading}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 
                     text-muted-foreground/60 hover:text-muted-foreground 
                     hover:bg-muted/50 dark:hover:bg-muted/80
                     transition-all duration-200"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="bg-primary hover:bg-primary/90 text-primary-foreground
                 dark:bg-primary dark:hover:bg-primary/80
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}
