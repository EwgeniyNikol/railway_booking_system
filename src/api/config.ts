const DEV_URL = 'http://localhost:3001';
const NETOLOGY_URL = 'https://students.netoservices.ru/fe-diplom';
const RENDER_URL = 'https://railway-booking-system-e82p.onrender.com';

let apiBaseUrl: string | null = null;
let resolvePromise: Promise<string> | null = null;

const ping = (url: string, timeoutMs: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
      reject(new Error('timeout'));
    }, timeoutMs);

    fetch(`${url}/routes/last`, { signal: controller.signal })
      .then((res) => {
        clearTimeout(timer);
        if (res.ok) resolve(url);
        else reject(new Error(`HTTP ${res.status}`));
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

export const resolveApiBaseUrl = (): Promise<string> => {
  if (apiBaseUrl) return Promise.resolve(apiBaseUrl);
  if (resolvePromise) return resolvePromise;

  if (import.meta.env.DEV) {
    apiBaseUrl = DEV_URL;
    return Promise.resolve(DEV_URL);
  }

  resolvePromise = new Promise<string>((resolve) => {
    let settled = false;

    const settle = (url: string) => {
      if (settled) return;
      settled = true;
      apiBaseUrl = url;
      resolve(url);
    };

    ping(NETOLOGY_URL, 3000)
      .then((url) => settle(url))
      .catch(() => {
        ping(RENDER_URL, 60000)
          .then((url) => settle(url))
          .catch(() => settle(RENDER_URL));
      });
  });

  return resolvePromise;
};

export const getApiBaseUrl = (): string => {
  if (apiBaseUrl) return apiBaseUrl;
  return import.meta.env.DEV ? DEV_URL : RENDER_URL;
};

export const getFallbackUrl = (current: string): string => {
  return current === NETOLOGY_URL ? RENDER_URL : NETOLOGY_URL;
};

export const NETOLOGY = NETOLOGY_URL;
export const RENDER = RENDER_URL;
