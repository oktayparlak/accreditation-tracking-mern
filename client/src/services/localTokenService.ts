import apiClient from './api-client';

const tokenLocalStorageKey = 'token';

export function setToken(token: string) {
  localStorage.setItem(tokenLocalStorageKey, token);
}

export function getToken() {
  const token = localStorage.getItem(tokenLocalStorageKey);
  return token;
}

export async function checkToken(): Promise<boolean> {
  const result: boolean = await apiClient
    .get('/auth/check-token')
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return result;
}
