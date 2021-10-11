import {randomBytes} from "crypto";

export const generateCsrfToken = (): string =>
  randomBytes(32).toString("hex");
