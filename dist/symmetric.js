"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symmetricDecrypt = exports.symmetricEncrypt = exports.generateSymmetricKey = void 0;
const ts_toolkit_1 = require("@bcg-ts/ts-toolkit");
const crypto_1 = require("crypto");
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const FIELD_SEPARATOR = "-";
const KEY_BYTES = 32;
const ENCODING = "hex";
const PLAIN_TEXT_ENCODING = "utf8";
const generateSymmetricKey = () => (0, crypto_1.randomBytes)(KEY_BYTES).toString(ENCODING);
exports.generateSymmetricKey = generateSymmetricKey;
const symmetricEncrypt = (key, data) => {
    try {
        const iv = (0, crypto_1.randomBytes)(IV_LENGTH);
        const cipher = (0, crypto_1.createCipheriv)(ALGORITHM, Buffer.from(key, ENCODING), iv);
        let encryptedData = cipher.update(data, PLAIN_TEXT_ENCODING, ENCODING);
        encryptedData += cipher.final(ENCODING);
        return [
            encryptedData,
            iv.toString(ENCODING),
            cipher.getAuthTag().toString(ENCODING),
        ].join(FIELD_SEPARATOR);
    }
    catch (error) {
        throw {
            name: "SymmetricEncryptionError",
            message: "failed to encrypt input with provided key",
            cause: error,
        };
    }
};
exports.symmetricEncrypt = symmetricEncrypt;
const symmetricDecrypt = (key, data) => {
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
        const decipher = (0, crypto_1.createDecipheriv)(ALGORITHM, Buffer.from(key, ENCODING), Buffer.from(fields.iv, ENCODING));
        decipher.setAuthTag(Buffer.from(fields.authTag, ENCODING));
        let plainTextData = decipher.update(fields.data, ENCODING, PLAIN_TEXT_ENCODING);
        plainTextData += decipher.final(PLAIN_TEXT_ENCODING);
        return plainTextData;
    }
    catch (error) {
        throw {
            name: "SymmetricDecryptionError",
            message: "failed to decrypt input with provided key",
            cause: (0, ts_toolkit_1.normalizeError)(error),
        };
    }
};
exports.symmetricDecrypt = symmetricDecrypt;
//# sourceMappingURL=symmetric.js.map