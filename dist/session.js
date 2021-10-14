"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionIdFromSessionToken = exports.generateSessionToken = exports.generateSessionId = void 0;
const ts_toolkit_1 = require("@bcg-ts/ts-toolkit");
const crypto_1 = require("crypto");
const hashing_1 = require("./hashing");
const SIGNED_TOKEN_REGEX = /(?<id>[a-f0-9]{64})(?<signature>[a-f0-9]{64})/;
const generateSessionId = () => (0, crypto_1.randomBytes)(32).toString("hex");
exports.generateSessionId = generateSessionId;
const generateSessionToken = (secret, sessionId) => sessionId +
    (0, hashing_1.hmac)(secret, sessionId, "hex").toString("hex");
exports.generateSessionToken = generateSessionToken;
const getSessionIdFromSessionToken = (secret, token) => {
    const parsed = SIGNED_TOKEN_REGEX.exec(token);
    if (parsed == null || parsed.length !== 3) {
        return ts_toolkit_1.Optional.none();
    }
    const [, sessionId, signature] = parsed;
    if (signature === (0, hashing_1.hmac)(secret, sessionId, "hex").toString("hex")) {
        return ts_toolkit_1.Optional.some(sessionId);
    }
    return ts_toolkit_1.Optional.none();
};
exports.getSessionIdFromSessionToken = getSessionIdFromSessionToken;
//# sourceMappingURL=session.js.map