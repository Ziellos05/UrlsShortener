import { GoogleSingInButton } from '../(infraestructure)/entrypoints/authButtons'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/app/(src)/(application)/auth'
import logo from '../(infraestructure)/public/logo.svg'
import Image from 'next/image';

// Página principal cuando el usuario no está logueado
export default async function SingInPage() {

  // Verifica si el usuario está logueado, en caso de estarlo, lo redirige a la página que amerita
  const session = await getServerSession(authConfig);

  if (session) return redirect("/main")

  return (
    <div className='w-full flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mt-10 mb-4 text-4xl'>Acortador de URLs</h1>
      <Image src={logo} alt='Logo' width={300} height={300} />
      <div className='flex flex-col items-center w-1/3 mt-10 p-5 shadow-md'>
        <h1 className='mt-10 mb-4 text-4xl font-bold'>Inicia sesión</h1>
        <GoogleSingInButton />
      </div>
    </div>
  )
}
