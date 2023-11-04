/**
 * @jest-environment node
 */

import { POST } from "@/app/(src)/(infraestructure)/api/getUser/route";

// Tests that a valid request with correct username, password and token is sent and a successful response is received from the API
it('test_valid_request', async () => {
    const mockResponse = { status: 200 };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
        status: 200
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const req = {
        json: () => Promise.resolve({
            username: 'testuser',
            password: 'testpassword',
            token: 'validtoken'
        })
    };
    const response = await POST(req);
    expect(response.status).toEqual(200);
    global.fetch.mockRestore();
});

// Tests that an error response is received from the API when a request is sent with an invalid token
it('test_invalid_token', async () => {
    const mockResponse = { status: 401 };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
        status: 401
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const req = {
        json: () => Promise.resolve({
            username: 'testuser',
            password: 'testpassword',
            token: 'invalidtoken'
        })
    };
    const response = await POST(req);
    expect(response.status).toEqual(401);
    global.fetch.mockRestore();
});

// Tests that a request with an empty body is sent and an error response is received from the API
it('test_empty_body', async () => {
    const req = {
        json: jest.fn().mockResolvedValue({
            username: '',
            password: '',
            token: 'valid_token'
        })
    };
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
        status: 400,
        json: jest.fn().mockResolvedValue({
            message: 'empty body'
        })
    });
    const response = await POST(req);
    expect(fetchSpy).toHaveBeenCalledWith(process.env.SPRINGBOOT_API + '/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'valid_token'
        },
        body: JSON.stringify({
            username: '',
            password: ''
        })
    });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: 'empty body' });
});