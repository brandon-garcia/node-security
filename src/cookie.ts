import {hmac} from "./hashing";
import {IOptional, Optional} from "@bcg-ts/ts-toolkit";

const DELIMITER = "-";

const COOKIE_REGEX = /token=(?<id>[a-zA-Z0-9]{32})-(?<signature>[a-zA-Z0-9]{32, 256})/;

export const generateSessionCookieHeader = (
  secret: string,
  sessionId: string
): string =>
  "token=" +
  sessionId +
  DELIMITER +
  hmac(secret, sessionId, "hex").toString("hex") +
  "; SameSite=Strict; secure; HttpOnly";

export const getSessionIdFromCookie = (
  secret: string,
  cookie: string,
): IOptional<string> => {
  const parsed = COOKIE_REGEX.exec(cookie);
  if (parsed == null || parsed.length !== 3) {
    return Optional.none();
  }
  const [, sessionId, signature] = parsed;
  if (signature === hmac(secret, sessionId, "hex").toString("hex")) {
    return Optional.some(sessionId);
  }
  return Optional.none();
}
