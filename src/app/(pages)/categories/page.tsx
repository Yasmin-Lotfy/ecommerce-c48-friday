"use client"

import { useSession } from "next-auth/react"

export default function Categories() {

 const session =  useSession();

//  console.log(session);
 



  return (
    <div>Categories page</div>
  )
}
