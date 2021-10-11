"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionIdFromCookie = exports.generateSessionCookie = void 0;
const hashing_1 = require("./hashing");
const ts_toolkit_1 = require("@bcg-ts/ts-toolkit");
const DELIMITER = "~";
const generateSessionCookie = (secret, sessionId) => sessionId +
    DELIMITER +
    (0, hashing_1.hmac)(secret, sessionId, "hex").toString("hex");
exports.generateSessionCookie = generateSessionCookie;
const getSessionIdFromCookie = (secret, cookie) => {
    const segments = cookie.split(DELIMITER);
    if (segments.length !== 2) {
        return ts_toolkit_1.Optional.none();
    }
    const [sessionId, signature] = segments;
    if (signature === (0, hashing_1.hmac)(secret, sessionId, "hex").toString("hex")) {
        return ts_toolkit_1.Optional.some(sessionId);
    }
    return ts_toolkit_1.Optional.none();
};
exports.getSessionIdFromCookie = getSessionIdFromCookie;
//# sourceMappingURL=cookie.js.map