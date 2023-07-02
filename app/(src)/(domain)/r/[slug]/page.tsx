import { redirect } from 'next/navigation';

export default function page({ params }: { params: { slug: string } }) {
    redirect('https://asurlshortenerdev.azurewebsites.net/r/'+params.slug);
  }