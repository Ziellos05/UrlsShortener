"use client"

import clipboard from '../public/clipboard-copy-custom.svg';
import Image from 'next/image';

// Componente que muestra en una tabla las URLs generadas para el usuario activo
export const UrlsTable = async (props: { token: string; }) => {

    // Acá se configuran los datos y se realiza la petición a la API para obtener las URLs
    
    const response = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/getUrls", {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(props.token),
    })

    const urls = await response.json()

    return (

        <div className="relative overflow-x-auto mt-10 mb-10">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            URL original
                        </th>
                        <th scope="col" className="px-6 py-3">
                            URL acortada
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Copiar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url: any, key: any) => {
                        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={key}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {url.original}
                            </th>
                            <td className="px-6 py-4">
                                {url.shortened}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => { navigator.clipboard.writeText(url.shortened) }} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-1 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    <Image src={clipboard} alt='Copy to clipboard' width={25} height={25} />
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

    )

}