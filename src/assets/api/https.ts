import wretch from 'wretch';
import QueryString from 'query-string';
import { z } from 'zod';

export const http = wretch()
    .content("application/json");

export const fetchAndValidate = async <T>(
    url: string,
    schema: z.ZodSchema<T>,
    method: 'GET' | 'POST' = 'GET',
    body?: unknown,
    query?: Record<string, any>
): Promise<T> => {
    if (query) {
        url += '?' + QueryString.stringify(query);
    }

    const request = http.url(url);

    let response;
    if (method === 'GET') {
        response = await request.get().json();
    } else if (method === 'POST') {
        response = await request.post(body).json();
    }

    return schema.parse(response);
};
