import {Optional} from "@bcg-ts/ts-toolkit";
import {hmac} from "./hashing";

export interface IMessageSignatureComponents {
  readonly httpMethod: string;
  readonly httpPath: string;
  readonly apiKey: string;
  readonly nonce: string;
  readonly timestamp: number;
  readonly payload?: string;
}

export const verifyMessageSignature = (
  secret: string,
  maxAge: number,
  signature: string,
  components: IMessageSignatureComponents,
): boolean => {
  const message = components.httpMethod +
    components.httpPath +
    components.apiKey +
    components.nonce +
    components.timestamp.toString() +
    Optional.of(components.payload).orElse("").value;

  const realSignature = hmac(secret, message, "utf8")
    .toString("hex");

  return signature === realSignature
    && ((Date.now() - components.timestamp) < maxAge);
};
