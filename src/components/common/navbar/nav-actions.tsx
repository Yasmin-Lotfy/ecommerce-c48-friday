"use client";
import Link from "next/link";
import {  CircleUser, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const actions = [
  { label: "Wishlist", href: "/wishlist", icon: Heart, mobile: true },
  { label: "Cart", href: "/cart", icon: ShoppingCart, mobile: true },
  { label: "Account", href: "/profile", icon: CircleUser, mobile: false },
];

export default function NavActions() {
  const { status } = useSession();
  const {noOfCartItems} = useContext(CartContext)!
  console.log(status);

  return (
    <div className="flex items-center gap-1">
      {status == "authenticated" ? (
        <>
          {actions.map(({ label, href, icon: Icon, mobile }) => (
            <Button
              key={href}
              asChild
              variant="ghost"
              size="icon-lg"
              className={mobile ? "" : "hidden md:inline-flex"}
            >
              <Link href={href} aria-label={label}>
              {label === "Cart" ?  <div className="relative">
                  <Icon className="size-5"  />
                  <Badge variant="default" className="absolute  top-[-20px] right-[-20px]">

                    {noOfCartItems}
                  </Badge>
              </div> : <> 
                  <Icon className="size-5"  />
                  
            </> }
            
              </Link>
            </Button>
          ))}
          {/* <Button variant="destructive">LogOut</Button> */}
        </>
      ) : status == "unauthenticated" ? (
        <>
          {" "}
          <Button>
            <Link href="/register">Register</Link>
          </Button>
          <Button>
            <Link href="/login">Login</Link>
          </Button>
        </>
      ) : (
        <>
        <Button variant="secondary"><Spinner/></Button>
        </>
      )}
    </div>
  );
}
