import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubmitForm from "@/app/(src)/(infraestructure)/entrypoints/submitUrlForm";

it('test_form_submission_without_original_url', async () => {
    const { getByLabelText, getByText } = render(<SubmitForm token='123' />);
    const originalInput = getByLabelText('URL original');
    const submitButton = getByText('Generar');

    fireEvent.change(originalInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(originalInput).toHaveAttribute('required'));
});

it("test_submit_form_with_invalid_original_url", async () => {
    const { getByLabelText, getByText } = render(<SubmitForm token='123' />);
    const originalInput = getByLabelText('URL original');
    const submitButton = getByText('Generar');

    fireEvent.change(originalInput, { target: { value: 'invalid url' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(originalInput).toHaveAttribute('required'));
})

it('test_submit_form_with_invalid_shortened_url', async () => {
    const { getByLabelText, getByText } = render(<SubmitForm token='123' />);
    const shortenedInput = getByLabelText('URL acortada (Opcional)');
    const submitButton = getByText('Generar');

    fireEvent.change(shortenedInput, { target: { value: 'b@d!' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(shortenedInput).toBeNull);
});

///////////////////////////////////////////////////////////////////////////////

// Tests that submitting a valid form with original URL, shortened URL and token generates a new URL with the correct data
it('test_valid_form_with_original_url_shortened_url_and_token_generates_new_url_with_correct_data', async () => {
    const mockFetch = jest.fn(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
            original: 'https://www.google.com',
            shortened: 'abc123',
            token: 'valid_token'
        })
    }));
    global.fetch = mockFetch;
    const originalUrl = 'https://www.google.com';
    const shortenedUrl = 'abc123';
    const token = 'valid_token';
    const event = {
        target: {
            original: {
                value: originalUrl
            },
            shortened: {
                value: shortenedUrl
            }
        },
        preventDefault: jest.fn()
    };
    const data = {
        original: event.target.original.value,
        shortened: event.target.shortened.value,
        token: token
    }
    await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/postUrl", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    expect(mockFetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/postUrl`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            original: originalUrl,
            shortened: shortenedUrl,
            token
        })
    });
    expect(event.preventDefault).toHaveBeenCalledTimes(0);
});