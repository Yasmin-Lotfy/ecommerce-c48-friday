import StaticAuth from '@/components/Auth/staticAuth'
import React from 'react'

export default function AuthLayout({children}:LayoutProps<"/">) {
  return (
    <>
    <div className="grid gap-6 grid-cols-12">
      <div className="col-span-6">
        <StaticAuth/>

      </div>
      <div className="col-span-6">

        {children}
      </div>
    </div>
    
    </>
  )
}
