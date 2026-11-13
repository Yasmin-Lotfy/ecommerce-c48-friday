"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { categoryLinks, navLinks } from "./nav-data"

const linkClass = "text-sm font-medium transition-colors hover:text-green-600"

export default function DesktopNav() {
  const pathname = usePathname()
  const [home, shop, brands] = navLinks

  const renderLink = (link: (typeof navLinks)[number]) => (
    <Link
      key={link.href}
      href={link.href}
      className={cn(linkClass, pathname === link.href && "text-green-600")}
    >
      {link.label}
    </Link>
  )

  return (
    <nav className="hidden items-center gap-6 xl:flex">
      {renderLink(home)}
      {renderLink(shop)}

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            linkClass,
            "flex items-center gap-1 outline-none",
            pathname.startsWith("/categories") && "text-green-600"
          )}
        >
          Categories
          <ChevronDown className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52">
          {categoryLinks.map((category, index) => (
            <div key={category.label}>
              <DropdownMenuItem asChild>
                <Link href={category.href}>{category.label}</Link>
              </DropdownMenuItem>
              {index === 0 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderLink(brands)}
    </nav>
  )
}
