import 'isomorphic-fetch';

const sendRequest = <T>(method: string, path: string, body: T) => {
    return fetch('/api/' + path, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(error => console.warn(error));
};

const get = (path: string) => sendRequest('GET', path, null);
const del = <T>(path: string, body: T) => sendRequest('DELETE', path, body);
const patch = <T>(path: string, body: T) => sendRequest('PATCH', path, body);
const post = <T>(path: string, body: T) => sendRequest('POST', path, body);
const put = <T>(path: string, body: T) => sendRequest('PUT', path, body);

export const ApiService = { del, get, patch, post, put };

export interface ApiResponse<T> {
    data: T;
}