import {hmac} from "./hashing";
import {IOptional, Optional} from "@bcg-ts/ts-toolkit";

const DELIMITER = "~";

export const generateSessionCookie = (
  secret: string,
  sessionId: string
): string =>
  sessionId +
  DELIMITER +
  hmac(secret, sessionId, "hex").toString("hex");

export const getSessionIdFromCookie = (
  secret: string,
  cookie: string,
): IOptional<string> => {
  const segments = cookie.split(DELIMITER);
  if (segments.length !== 2) {
    return Optional.none();
  }
  const [sessionId, signature] = segments;
  if (signature === hmac(secret, sessionId, "hex").toString("hex")) {
    return Optional.some(sessionId);
  }
  return Optional.none();
}
