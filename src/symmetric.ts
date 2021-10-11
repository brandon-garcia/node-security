import {normalizeError} from "@bcg-ts/ts-toolkit";
import {createCipheriv, createDecipheriv, randomBytes} from "crypto";

const ALGORITHM = "aes-256-gcm" as const;
const IV_LENGTH = 12;
const FIELD_SEPARATOR = "-";
const KEY_BYTES = 32;
const ENCODING = "hex" as const;
const PLAIN_TEXT_ENCODING = "utf8" as const;

export const generateSymmetricKey = (): string =>
  randomBytes(KEY_BYTES).toString(ENCODING);

export const symmetricEncrypt = (
  key: string,
  data: string,
): string => {
  try {
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(
      ALGORITHM,
      Buffer.from(key, ENCODING),
      iv,
    );

    let encryptedData = cipher.update(data, PLAIN_TEXT_ENCODING, ENCODING);
    encryptedData += cipher.final(ENCODING);

    return [
      encryptedData,
      iv.toString(ENCODING),
      cipher.getAuthTag().toString(ENCODING),
    ].join(FIELD_SEPARATOR);
  } catch (error: unknown) {
    throw {
      name: "SymmetricEncryptionError",
      message: "failed to encrypt input with provided key",
      cause: error,
    };
  }
};

export const symmetricDecrypt = (
  key: string,
  data: string,
): string => {
  const fieldList = data.split(FIELD_SEPARATOR);
  if (fieldList.length < 3) {
    throw {
      name: "SymmetricDecryptionError",
      message: "failed to decode input",
    };
  }

  const fields = {
    data: fieldList[0],
    iv: fieldList[1],
    authTag: fieldList[2],
  };

  try {
    const decipher = createDecipheriv(
      ALGORITHM,
      Buffer.from(key, ENCODING),
      Buffer.from(fields.iv, ENCODING),
    );
    decipher.setAuthTag(Buffer.from(fields.authTag, ENCODING));

    let plainTextData = decipher.update(fields.data, ENCODING, PLAIN_TEXT_ENCODING);
    plainTextData += decipher.final(PLAIN_TEXT_ENCODING);
    return plainTextData;
  } catch (error: unknown) {
    throw {
      name: "SymmetricDecryptionError",
      message: "failed to decrypt input with provided key",
      cause: normalizeError(error),
    };
  }
};
