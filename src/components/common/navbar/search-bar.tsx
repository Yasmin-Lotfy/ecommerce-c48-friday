import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SearchBarProps = {
  placeholder?: string
  className?: string
}

export default function SearchBar({
  placeholder = "Search for products, brands and more...",
  className,
}: SearchBarProps) {
  return (
    <form action="/products" role="search" className={cn("relative w-full", className)}>
      <Input
        type="search"
        name="q"
        placeholder={placeholder}
        aria-label="Search products"
        className="h-11 rounded-full bg-muted/50 ps-5 pe-12"
      />
      <Button
        type="submit"
        size="icon"
        aria-label="Search"
        className="absolute end-1.5 top-1/2 -translate-y-1/2 rounded-full bg-green-600 text-white hover:bg-green-700"
      >
        <Search />
      </Button>
    </form>
  )
}
