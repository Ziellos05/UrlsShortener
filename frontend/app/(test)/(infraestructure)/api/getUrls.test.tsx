/**
 * @jest-environment node
 */

import { POST } from "@/app/(src)/(infraestructure)/api/getUrls/route";

// Tests that a valid request returns a response

it("test_valid_request_returns_response", async () => {
    const mockResponse = { data: 'test data' };
    const mockRequest = { json: jest.fn().mockResolvedValue('test auth') };
    const fetchMock = jest.spyOn(global, 'fetch');

    fetchMock.mockResolvedValue(mockResponse);

    const response = await POST(mockRequest);

    expect(fetchMock).toHaveBeenCalledWith(process.env.SPRINGBOOT_API + "/urls", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'test auth'
        }
    })})

    // Tests that the response is in JSON format
    it("test_response_is_in_json_format", async () => {
        const mockResponse = {
            ok: true,
            json: () => Promise.resolve({ data: 'test data' }),
            headers: {
                get: jest.fn().mockReturnValue('application/json'),
            },
        };
        const mockFetch = jest.spyOn(global, 'fetch');
        mockFetch.mockResolvedValue(mockResponse);

        const mockReq = {
            json: jest.fn().mockResolvedValue('test auth'),
        };

        const response = await POST(mockReq);

        expect(mockFetch).toHaveBeenCalledWith(process.env.SPRINGBOOT_API + "/urls", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'test auth'
            }
        })
    })

    // Tests that the response contains the expected data
    it('test_response_includes_expected_data_format', async () => {
        const req = { json: jest.fn().mockResolvedValue('token') };
        const fetch = jest.fn().mockResolvedValue({ status: 200, json: jest.fn().mockResolvedValue({ urls: [] }) });
        global.fetch = fetch;
        const response = await POST(req);
        const data = await response.json();
        expect(data).toHaveProperty('urls');
        expect(Array.isArray(data.urls)).toBe(true);
    });

