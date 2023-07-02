"use client"

export function SubmitButton(props: { token: string; }) {

    

    return (
        <form>
            <p><label htmlFor="original">URL Original</label>
                <input type="text" id="original" name="original" /></p>
            <p><label htmlFor="shortened">URL acortada (Opcional)</label>
                <input type="text" id="shortened" name="shortened" /></p>
            <button type="submit">Submit</button>
        </form>
    )

}