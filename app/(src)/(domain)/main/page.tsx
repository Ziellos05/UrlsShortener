import { getServerSession } from 'next-auth';
import { authConfig, loginIsRequiredServer } from '@/app/(src)/(application)/auth';
import { postData, getData } from '@/app/(src)/(infraestructure)/api/api';
import constructora from '../../(infraestructure)/public/logo-constructora-bolivar.svg'
import Image from 'next/image';
import { LogoutButton } from '../../(infraestructure)/entrypoints/logoutButton';
import { UrlsTable } from '../../(infraestructure)/entrypoints/urlsTable';
import SubmitButton from '../../(infraestructure)/entrypoints/submitUrlButton';

export default async function SingInPage(this: any) {

  await loginIsRequiredServer();

  const session = await getServerSession(authConfig);

  const user = {
    username: session?.user?.email,
    password: process.env.NEXTAUTH_SECRET as string
  }

  const backendToken = await postData(user).then((data) => {
    return data.password; // JSON data parsed by `data.json()` call
  });

  const urls = await getData(backendToken);


  // DESDE AQUÍ ESTÁ LA LÓGICA PARA LLAMAR A LA API Y AGREGAR UNA NUEVA URL

  // Handles the submit event on form submit.

  return (
    <div className='w-full flex flex-col items-center justify-center min-h-screen py-2'>

      <h3 className='mt-10 mb-10 text-2xl'>Usuario actual: {session?.user?.email}   <LogoutButton/></h3>
      <Image src={constructora} alt='Constructora Bolivar logo' width={150} height={150} />
      <h2 className='mt-10 mb-5 font-semibold'>Nueva URL acortada</h2>

      <SubmitButton token={backendToken} />

      <UrlsTable urls={urls} />

    </div>
  )
}
