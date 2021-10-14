import {generateSessionToken} from "./session";

const generateSessionTokenCookieHeader = (
  secret: string,
  sessionId: string
): string =>
  "token=" +
  generateSessionToken(secret, sessionId) +
  "; SameSite=Strict; secure; HttpOnly";
