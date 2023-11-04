"use client"
 
// Componente que permite desloguearse de la autenticación con OAuth2.0
import { signOut } from "next-auth/react"

export function LogoutButton() {
    const handleClick = () => {
        signOut();
    };

    return (
        <button onClick={handleClick} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-1 py-1 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" data-testid="logoutButton">Salir</button>
    )

}