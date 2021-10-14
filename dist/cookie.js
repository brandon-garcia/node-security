"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionIdFromCookie = exports.generateSessionCookieHeader = void 0;
const hashing_1 = require("./hashing");
const ts_toolkit_1 = require("@bcg-ts/ts-toolkit");
const DELIMITER = "-";
const COOKIE_REGEX = /token=(?<id>[a-zA-Z0-9]{32})-(?<signature>[a-zA-Z0-9]{32, 256})/;
const generateSessionCookieHeader = (secret, sessionId) => "token=" +
    sessionId +
    DELIMITER +
    (0, hashing_1.hmac)(secret, sessionId, "hex").toString("hex") +
    "; SameSite=Strict; secure; HttpOnly";
exports.generateSessionCookieHeader = generateSessionCookieHeader;
const getSessionIdFromCookie = (secret, cookie) => {
    const parsed = COOKIE_REGEX.exec(cookie);
    if (parsed == null || parsed.length !== 3) {
        return ts_toolkit_1.Optional.none();
    }
    const [, sessionId, signature] = parsed;
    if (signature === (0, hashing_1.hmac)(secret, sessionId, "hex").toString("hex")) {
        return ts_toolkit_1.Optional.some(sessionId);
    }
    return ts_toolkit_1.Optional.none();
};
exports.getSessionIdFromCookie = getSessionIdFromCookie;
//# sourceMappingURL=cookie.js.map