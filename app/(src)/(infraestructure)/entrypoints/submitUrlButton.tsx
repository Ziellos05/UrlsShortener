"use client"

export default function SubmitButton(props: { token: string; }) {
  // Handles the submit event on form submit.
  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
 
    // Get data from the form.
    const data = {
      original: event.target.original.value,
      shortened: event.target.shortened.value,
      token: props.token
    }
 
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)
 
    // API endpoint where we send form data.
    const endpoint = "/api/url";
 
    // Form the request for sending data to the server.
 
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json'
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    })
 
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.

    try {
      const result = await response.json()
      if (response.status === 200) {
        alert("URL generada");
      }
    } catch (error) {
      console.error(error);
      alert("Por favor cambia el texto acortado");
    }

  }
  return (
    // We pass the event to the handleSubmit() function on submit.
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