"use client"

import Link from 'next/link'
import { FormEvent } from 'react'
import styles from '../styles/Home.module.css'

export default function PageWithJSbasedForm(props: { token: string; }) {
  // Handle the submit event on form submit.

  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Cast the event target to an html form
    const form = event.target as HTMLFormElement

    // Get data from the form.
    const data = {
      original: form.first.value as string,
      shortened: form.last.value as string,
    }

    // Send the form data to our API and get a response.
    const response = await fetch('https://asurlshortenerdev.azurewebsites.net/createshortened', {
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(data),
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.token
      },
      // The method is POST because we are sending data.
      method: 'POST',
      mode: "no-cors", // no-cors, *cors, same-origin
    })

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(result.data)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="first">First Name</label>
        <input type="text" id="first" name="first" required />
        <label htmlFor="last">Last Name</label>
        <input type="text" id="last" name="last" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}