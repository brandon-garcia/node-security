import {TypeUtils} from "@bcg-ts/ts-toolkit"
import {createHash, createHmac, Encoding} from "crypto";

const HASHING_ALGORITHM = "sha256";

export const hash = (data: string|Buffer, inputEncoding?: Encoding): Buffer => {
  const hashInstance = createHash(HASHING_ALGORITHM);
  if (TypeUtils.string(data)) {
    if (inputEncoding == null || inputEncoding === "binary") {
      return hashInstance
        .update(data)
        .digest();
    }
    return hashInstance
      .update(data, inputEncoding)
      .digest();
  }
  return hashInstance
    .update(data)
    .digest();
};

export const hmac = (secret: string|Buffer, data: string|Buffer, inputEncoding?: Encoding): Buffer => {
  const hmacInstance = createHmac(HASHING_ALGORITHM, secret);
  if (TypeUtils.string(data)) {
    if (inputEncoding == null || inputEncoding === "binary") {
      return hmacInstance
        .update(data)
        .digest();
    }
    return hmacInstance
      .update(data, inputEncoding)
      .digest();
  }
  return hmacInstance
    .update(data)
    .digest();
}
