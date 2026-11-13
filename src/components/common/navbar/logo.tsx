import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/freshcart-logo.49f1b44d.svg"

export default function Logo() {
  return (
    <Link href="/" className="shrink-0" aria-label="FreshCart home">
      <Image src={logo} alt="FreshCart" className="h-7 w-auto sm:h-8" preload />
    </Link>
  )
}
