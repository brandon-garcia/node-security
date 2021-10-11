import {randomBytes} from "crypto";

export const generateSessionId = (): string =>
  randomBytes(32).toString("hex");
