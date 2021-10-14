import {generateSessionToken} from "./session";

export const generateSessionTokenCookieHeader = (
  secret: string,
  sessionId: string
): string =>
  "token=" +
  generateSessionToken(secret, sessionId) +
  "; SameSite=Strict; secure; HttpOnly";
