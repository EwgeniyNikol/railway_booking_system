const API_BASE_URL = 'https://students.netoservices.ru/fe-diplom';

export async function searchCities(name: string) {
  const response = await fetch(
    `${API_BASE_URL}/routes/cities?name=${encodeURIComponent(name)}`
  );
  if (!response.ok) {
    throw new Error('Ошибка поиска городов');
  }
  return response.json();
}

export async function fetchLastRoutes() {
  const response = await fetch(`${API_BASE_URL}/routes/last`);
  if (!response.ok) {
    throw new Error('Ошибка загрузки последних направлений');
  }
  return response.json();
}

export async function fetchRoutes(
  params: Record<string, string | number | boolean>
) {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== false) {
      queryParams.append(key, String(value));
    }
  });

  const response = await fetch(`${API_BASE_URL}/routes?${queryParams}`);
  if (!response.ok) {
    throw new Error('Ошибка поиска направлений');
  }
  return response.json();
}

export async function fetchSeats(
  routeId: string,
  params: Record<string, string | number | boolean>
) {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== false) {
      queryParams.append(key, String(value));
    }
  });

  const response = await fetch(
    `${API_BASE_URL}/routes/${routeId}/seats?${queryParams}`
  );
  if (!response.ok) {
    throw new Error('Ошибка загрузки мест');
  }
  return response.json();
}

export async function submitOrder(order: unknown) {
  const response = await fetch(`${API_BASE_URL}/order`, {
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
  const response = await fetch(
    `${API_BASE_URL}/subscribe?email=${encodeURIComponent(email)}`
  );
  if (!response.ok) {
    throw new Error('Ошибка подписки');
  }
  return response.json();
}
