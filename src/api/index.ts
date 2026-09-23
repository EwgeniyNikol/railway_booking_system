import { resolveApiBaseUrl, getApiBaseUrl, getFallbackUrl } from './config';

const fetchWithFallback = async (
  path: string,
  options?: RequestInit,
  preferFallback = false
): Promise<Response> => {
  await resolveApiBaseUrl();
  const current = getApiBaseUrl();
  const fallback = getFallbackUrl(current);

  const first = preferFallback ? fallback : current;
  const second = preferFallback ? current : fallback;

  try {
    const res = await fetch(`${first}${path}`, options);
    if (res.ok) return res;
    throw new Error(`HTTP ${res.status}`);
  } catch {
    return fetch(`${second}${path}`, options);
  }
};

export async function searchCities(name: string) {
  const response = await fetchWithFallback(
    `/routes/cities?name=${encodeURIComponent(name)}`
  );
  if (!response.ok) {
    throw new Error('Ошибка поиска городов');
  }
  return response.json();
}

export async function fetchLastRoutes() {
  const response = await fetchWithFallback('/routes/last');
  if (!response.ok) {
    throw new Error('Ошибка загрузки последних направлений');
  }
  return response.json();
}

export async function fetchRoutes(
  params: Record<string, string | number | boolean | null>
) {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== false) {
      queryParams.append(key, String(value));
    }
  });

  const response = await fetchWithFallback(`/routes?${queryParams}`);
  if (!response.ok) {
    throw new Error('Ошибка поиска направлений');
  }
  return response.json();
}

export async function fetchSeats(
  routeId: string,
  params: Record<string, string | number | boolean | null>
) {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== false) {
      queryParams.append(key, String(value));
    }
  });

  const response = await fetchWithFallback(
    `/routes/${routeId}/seats?${queryParams}`
  );
  if (!response.ok) {
    throw new Error('Ошибка загрузки мест');
  }
  return response.json();
}

export async function submitOrder(order: unknown) {
  const response = await fetchWithFallback('/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error('Ошибка оформления заказа');
  }
  return response.json();
}

export async function subscribeEmail(email: string) {
  const response = await fetchWithFallback(
    `/subscribe?email=${encodeURIComponent(email)}`,
    undefined,
    true
  );
  if (!response.ok) {
    throw new Error('Ошибка подписки');
  }
  return response.json();
}
