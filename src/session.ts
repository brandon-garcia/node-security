import {IOptional, Optional} from "@bcg-ts/ts-toolkit";
import {randomBytes} from "crypto";
import {hmac} from "./hashing";

const SIGNED_TOKEN_REGEX = /(?<id>[a-f0-9]{64})(?<signature>[a-f0-9]{64})/;

export const generateSessionId = (): string =>
  randomBytes(32).toString("hex");

export const generateSessionToken = (
  secret: string,
  sessionId: string
): string =>
  sessionId +
  hmac(secret, sessionId, "hex").toString("hex");

export const getSessionIdFromSessionToken = (
  secret: string,
  token: string,
): IOptional<string> => {
  const parsed = SIGNED_TOKEN_REGEX.exec(token);
  if (parsed == null || parsed.length !== 3) {
    return Optional.none();
  }
  const [, sessionId, signature] = parsed;
  if (signature === hmac(secret, sessionId, "hex").toString("hex")) {
    return Optional.some(sessionId);
  }
  return Optional.none();
};
