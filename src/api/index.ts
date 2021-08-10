export async function fetchJson<Response = any>(url: string, link: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(`https://${link}/api/${url}`, {
    ...init ?? {},
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });

  return response.json();
}
