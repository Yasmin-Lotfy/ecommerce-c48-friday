import { getOutToken } from '@/lib/auth';
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Brands() {

  const session =await getServerSession(authOptions);

  // console.log(session);

  const response = await getOutToken();
  console.log(response);
  
  
  return (
    <div>Brands page</div>
  )
}
