"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmac = exports.hash = void 0;
const ts_toolkit_1 = require("@bcg-ts/ts-toolkit");
const crypto_1 = require("crypto");
const HASHING_ALGORITHM = "sha256";
const hash = (data, inputEncoding) => {
    const hashInstance = (0, crypto_1.createHash)(HASHING_ALGORITHM);
    if (ts_toolkit_1.TypeUtils.string(data)) {
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
exports.hash = hash;
const hmac = (secret, data, inputEncoding) => {
    const hmacInstance = (0, crypto_1.createHmac)(HASHING_ALGORITHM, secret);
    if (ts_toolkit_1.TypeUtils.string(data)) {
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
};
exports.hmac = hmac;
//# sourceMappingURL=hashing.js.map