import Cookies from "js-cookie";

export const userTokenKey = "token";
export const tokenExpiresAtKey = "token_expires_at";

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

export const setAuthSession = (token: string) => {
  Cookies.set(userTokenKey, token, { expires: 1 / 96 });
  localStorage.setItem(
    tokenExpiresAtKey,
    String(Date.now() + FIFTEEN_MINUTES_MS),
  );
};

export const clearAuthSession = () => {
  Cookies.remove(userTokenKey);
  localStorage.removeItem(tokenExpiresAtKey);
};

export const getToken = () => {
  return Cookies.get(userTokenKey);
};

export const isSessionExpired = () => {
  const expiresAt = localStorage.getItem(tokenExpiresAtKey);

  if (!expiresAt) return false;

  return Date.now() >= Number(expiresAt);
};
