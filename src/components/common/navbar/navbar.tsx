"use client"
import { Separator } from "@/components/ui/separator"
import TopBar from "./top-bar"
import Logo from "./logo"
import SearchBar from "./search-bar"
import DesktopNav from "./desktop-nav"
import SupportBadge from "./support-badge"
import NavActions from "./nav-actions"
import MobileMenu from "./mobile-menu"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export default function Navbar() {
 const {counter}  = useSelector((state:RootState)=> state.counter)
  return (
    <header className="sticky top-0 z-40 bg-background shadow-sm">
      <TopBar />

      <div className="container mx-auto flex h-18 items-center gap-4 px-4 lg:gap-6">
        <Logo />
        <p>Counter : {counter}</p>
        
        <SearchBar className="hidden max-w-xl flex-1 md:block" />

        <div className="ms-auto flex items-center gap-4 lg:gap-6">
          <DesktopNav />
          <SupportBadge />
          <Separator orientation="vertical" className="hidden h-8! lg:block" />
          <NavActions />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
