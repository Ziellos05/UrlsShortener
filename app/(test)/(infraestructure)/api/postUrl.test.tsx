/**
 * @jest-environment node
 */

import { POST } from "@/app/(src)/(infraestructure)/api/postUrl/route";

// Tests that the function makes a successful API call with valid request and token
it('test_successful_api_call', async () => {
    const mockResponse = { status: 200 };
    const mockFetch = jest.fn().mockResolvedValue(mockResponse);
    global.fetch = mockFetch;
    const req = { json: jest.fn().mockResolvedValue({ original: 'http://www.example.com', shortened: 'http://www.ex.com' }), token: 'valid_token' };
    const response = await POST(req);
    expect(mockFetch).toHaveBeenCalledWith(`${process.env.SPRINGBOOT_API}/createshortened`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original: 'http://www.example.com', shortened: 'http://www.ex.com' })
    });
    expect(response).toEqual(mockResponse);
});

// Tests that the function handles an invalid request object
it('test_invalid_request_object', async () => {
    const req = {};
    await expect(POST(req)).rejects.toThrow();
});

// Tests that the function handles API call failure
it('test_api_call_failure', async () => {
    const mockResponse = { status: 500 };
    const mockFetch = jest.fn().mockResolvedValue(mockResponse);
    global.fetch = mockFetch;
    const req = { json: jest.fn().mockResolvedValue({ original: 'http://www.example.com', shortened: 'http://www.ex.com' }), token: 'valid_token' };
    await expect(POST(req)).resolves.toBe(mockResponse);
});