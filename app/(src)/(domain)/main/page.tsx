import { getServerSession } from 'next-auth';
import { authConfig, loginIsRequiredServer } from '@/app/(src)/(application)/auth';
import constructora from '../../(infraestructure)/public/logo-constructora-bolivar.svg'
import Image from 'next/image';
import { LogoutButton } from '../../(infraestructure)/entrypoints/logoutButton';
import { UrlsTable } from '../../(infraestructure)/entrypoints/urlsTable';
import SubmitForm from '../../(infraestructure)/entrypoints/submitUrlForm';

// Página principal cuando el usuario inicia sesión
export default async function SingInPage(this: any) {

  // Verifica si hay una sesión actual activa
  await loginIsRequiredServer();

  // Obtiene los datos de la sesión actual
  const session = await getServerSession(authConfig);

  const user = {
    username: session?.user?.email,
    password: process.env.NEXTAUTH_SECRET as string
  }

  // Conecta con la API y obtiene el token desde el Backend
  const response = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/getUser", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  })

  const backendToken = await response.json().then((data) => {
    return data.password;
  });

  return (
    <div className='w-full flex flex-col items-center justify-center min-h-screen py-2'>

      <h3 className='mt-10 mb-10 text-2xl'>Usuario actual: {session?.user?.email}   <LogoutButton /></h3>
      <Image src={constructora} alt='Constructora Bolivar logo' width={150} height={150} />
      <h2 className='mt-10 mb-5 font-semibold'>Nueva URL acortada</h2>

      <SubmitForm token={backendToken} />

      <UrlsTable token={backendToken} />

    </div>
  )
}
