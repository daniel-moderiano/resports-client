// Fetch wrapper that accepts a generic parameter/type T for the tpe of the response body (response.json())
type FetchOptions = RequestInit;

export async function httpRequest<T = unknown>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json(); // Read error details from response body
    throw new Error(
      `HTTP error: ${response.statusText} with code ${
        response.status
      }, details: ${JSON.stringify(errorData)}`
    );
  }

  const data: T = await response.json();
  return data;
}
