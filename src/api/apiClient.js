import { REST_URL, SUPABASE_PUBLISHABLE_KEY } from "../config/api";

export async function apiClient(endpoint, options = {}) {
  const url = REST_URL + endpoint;

  const { token, headers: customHeaders, ...fetchOptions } = options;

  const headers = {
    ...customHeaders,
    apikey: SUPABASE_PUBLISHABLE_KEY,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok){
      throw new Error( `Request failed: ${response.status} ${response.statusText}`);
  }

  if(response.status === 204){
    return null;
  }

  const data = await response.text();

  if(!data) return null;

  return JSON.parse(data);
}
