"use client"

import { signOut } from "next-auth/react"

export default () => <button onClick={() => signOut()}>Sign out</button>

export function LogoutButton() {
    const handleClick = () => {
        signOut();
    };

    return (
        <button onClick={handleClick} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-1 py-1 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Salir</button>
    )

}