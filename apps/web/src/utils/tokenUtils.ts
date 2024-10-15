const TOKEN_KEY = "authToken";

export const isTokenAvailable = (): boolean => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
