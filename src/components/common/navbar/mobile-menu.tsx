"use client"

import Link from "next/link"
import { Headset, Heart, LogOut, Menu, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Logo from "./logo"
import SearchBar from "./search-bar"
import { navLinks } from "./nav-data"

const menuLinks = [navLinks[0], navLinks[1], { label: "Categories", href: "/categories" }, navLinks[2]]

const iconLinks = [
  { label: "Wishlist", href: "/wishlist", icon: Heart, color: "text-red-500 bg-red-50" },
  { label: "Cart", href: "/cart", icon: ShoppingCart, color: "text-green-600 bg-green-50" },
  { label: "Usama", href: "/profile", icon: User, color: "text-muted-foreground bg-muted" },
]

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon-lg"
          aria-label="Open menu"
          className="bg-green-600 text-white hover:bg-green-700 xl:hidden"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="gap-0 overflow-y-auto">
        <SheetHeader className="border-b bg-muted/40 p-4">
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <div className="border-b p-4 md:hidden">
          <SearchBar placeholder="Search products..." />
        </div>

        <nav className="flex flex-col p-4">
          {menuLinks.map((link) => (
            <SheetClose asChild key={link.label}>
              <Link href={link.href} className="rounded-lg px-3 py-3 font-medium hover:bg-muted hover:text-green-600">
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <Separator className="mx-4 w-auto!" />

        <div className="flex flex-col gap-1 p-4">
          {iconLinks.map(({ label, href, icon: Icon, color }) => (
            <SheetClose asChild key={label}>
              <Link href={href} className="flex items-center gap-3 rounded-lg px-3 py-2 font-medium hover:bg-muted">
                <span className={`flex size-9 items-center justify-center rounded-full ${color}`}>
                  <Icon className="size-4" />
                </span>
                {label}
              </Link>
            </SheetClose>
          ))}
          <button type="button" className="flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-red-500 hover:bg-red-50">
            <span className="flex size-9 items-center justify-center rounded-full bg-red-50">
              <LogOut className="size-4" />
            </span>
            Sign Out
          </button>
        </div>

        <div className="mt-auto p-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Headset className="size-5" />
            </span>
            <div className="text-sm leading-tight">
              <p className="font-semibold">Need Help?</p>
              <a href="mailto:support@freshcart.com" className="text-green-600 hover:underline">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
