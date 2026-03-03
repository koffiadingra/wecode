"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Recherche :", query)
    // Ici tu peux faire :
    // - un fetch vers une API
    // - router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-md items-center gap-2"
    >
      <div className="relative w-full">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* <Button type="submit">
        OK
      </Button> */}
    </form>
  )
}