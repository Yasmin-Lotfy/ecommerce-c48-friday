"use client";
import Link from "next/link";
import { Gift, LogOut, Mail, Phone, Truck, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { contactInfo } from "./nav-data";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";

export default function TopBar() {
  const session = useSession();
  console.log(session);

  function logOut() {
    signOut({
      callbackUrl: "/login",
      redirect:true
    });
  }

  return (
    <div className="hidden border-b bg-background text-xs text-muted-foreground md:block">
      <div className="container mx-auto flex h-10 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Truck className="size-4 text-green-600" />
            Free Shipping on Orders 500 EGP
          </span>
          <span className="hidden items-center gap-2 lg:flex">
            <Gift className="size-4 text-green-600" />
            New Arrivals Daily
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={`tel:${contactInfo.phone}`}
            className="hidden items-center gap-2 hover:text-green-600 lg:flex"
          >
            <Phone className="size-4" />
            {contactInfo.phone}
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="hidden items-center gap-2 hover:text-green-600 lg:flex"
          >
            <Mail className="size-4" />
            {contactInfo.email}
          </a>
          <Separator orientation="vertical" className="hidden h-4! lg:block" />
          <Link
            href="/profile"
            className="flex items-center gap-2 hover:text-green-600"
          >
            <User className="size-4" />
            {session.data?.user?.name}
          </Link>
          {session.status === "authenticated" ? (
            <>
              <button
                type="button"
                onClick={logOut}
                className="flex items-center gap-2 hover:text-green-600"
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            </>
          ) : session.status == "unauthenticated" ? (
            ""
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}
