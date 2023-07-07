"use client"

// Componente que presenta el form a través del cual se puede registrar una nueva URL
export default function SubmitForm(props: { token: string; }) {

  // Acá se configura la data y se hace el request a la API
  const handleSubmit = async (event: any) => {

    const data = {
      original: event.target.original.value,
      shortened: event.target.shortened.value,
      token: props.token
    }

    const response = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/postUrl", {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data),
    })

    // Este Try Catch es el que genera las alertas que avisa si la nueva URL se generó o no
    try {
      const result = await response.json()
      if (response.status === 200) {
        alert("URL generada");
      }
    } catch (error) {
      alert("Por favor cambia el texto acortado");
    }

  }
  return (

    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="original" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL original</label>
            <input type="text" id="original" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="https://..." required={true} pattern={"^(https://).*$"} />
          </div>
          <div>
            <label htmlFor="shortened" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL acortada (Opcional)</label>
            <input type="text" id="shortened" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="ABC12..." required={false} minLength={3} maxLength={6} pattern={"[a-zA-Z0-9]+"} />
          </div>
        </div>
        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Generar</button>
      </form>
    </div>
  )
}