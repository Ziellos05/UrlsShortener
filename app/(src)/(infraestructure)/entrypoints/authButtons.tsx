"use client"

import vercel from '@/app/(src)/(infraestructure)/public/vercel.svg'
import Image from 'next/image';
import { signIn } from 'next-auth/react'

export function GoogleSingInButton() {
    const handleClick = () => {
        signIn("google");
    };

    return (
        <button onClick={handleClick}
        className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200">
            <Image src={vercel} alt='Google logo' width={20} height={20} />
        </button>
    )

}