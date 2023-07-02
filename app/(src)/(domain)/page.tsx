import Google from 'next-auth/providers/google'
import Image from 'next/image'
import Link from 'next/link'
import { GoogleSingInButton } from '../(infraestructure)/entrypoints/authButtons'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/app/(src)/(application)/authconfig'

export default async  function SingInPage() {

  const session = await getServerSession(authConfig);

  if (session) return redirect("/user")

  return (
    <div className='w-full flex flex-col items-center justify-center min-h-screen py-2'>
  
      <div className='flex flex-col items-center w-1/3 mt-10 p-10 shadow-md'>
        <h1 className='mt-10 mb-4 text-4xl font-bold'>Sing In</h1>
        <GoogleSingInButton />
      </div>
    </div>
  )
}
