"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMessageSignature = void 0;
const ts_toolkit_1 = require("@bcg-ts/ts-toolkit");
const hashing_1 = require("./hashing");
const verifyMessageSignature = (secret, maxAge, signature, components) => {
    const message = components.httpMethod +
        components.httpPath +
        components.apiKey +
        components.nonce +
        components.timestamp.toString() +
        ts_toolkit_1.Optional.of(components.payload).orElse("").value;
    const realSignature = (0, hashing_1.hmac)(secret, message, "utf8")
        .toString("hex");
    return signature === realSignature
        && ((Date.now() - components.timestamp) < maxAge);
};
exports.verifyMessageSignature = verifyMessageSignature;
//# sourceMappingURL=message-signature.js.map