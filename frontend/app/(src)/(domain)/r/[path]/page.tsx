import { redirect } from 'next/navigation';

// Ruta que permite al usuario redirigirse al link original
export default function page({ params }: { params: { path: string } }) {
  redirect(process.env.SPRINGBOOT_API+'/r/' + params.path);
}