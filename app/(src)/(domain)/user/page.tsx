import { getServerSession } from 'next-auth';
import { authConfig, loginIsRequiredServer } from '@/app/(src)/(application)/authconfig';
import { postData, getData, postUrl } from '@/app/(src)/(infraestructure)/adapters/api/api';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react';
import { SubmitButton } from '../../(infraestructure)/entrypoints/submitUrlButton';

const wait = (ms: number) => new Promise((rs) => setTimeout(rs, ms));

export default async  function SingInPage(this: any) {

    await loginIsRequiredServer();

    const session = await getServerSession(authConfig);

    const user = {
      username:session?.user?.email,
      password:process.env.NEXTAUTH_SECRET as string
    }

    const backendToken = await postData(user).then((data) => {
      return data.password; // JSON data parsed by `data.json()` call
    });

    await postUrl(backendToken).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });

    const urls = await getData(backendToken);

    // const newUrl = await postUrl(backendToken)

    
// DESDE AQUÍ ESTÁ LA LÓGICA PARA LLAMAR A LA API Y AGREGAR UNA NUEVA URL

  // Handles the submit event on form submit.

  return (
    <div className='w-full flex flex-col items-center justify-center min-h-screen py-2'>
  
  <h3>This is your session: {session?.user?.email}</h3>

  <h2>Nueva URL acortada</h2>
  <SubmitButton token={backendToken} />

  {urls.map((url: { original: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => {
  return <li>{url.original}</li>
})}
    </div>
  )
}
