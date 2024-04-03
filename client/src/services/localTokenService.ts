const tokenLocalStorageKey = 'token';

export function setToken(token: string) {
  localStorage.setItem(tokenLocalStorageKey, token);
}

export function getToken() {
  const token = localStorage.getItem(tokenLocalStorageKey);
  return token;
}
