"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSessionTokenCookieHeader = void 0;
const session_1 = require("./session");
const generateSessionTokenCookieHeader = (secret, sessionId) => "token=" +
    (0, session_1.generateSessionToken)(secret, sessionId) +
    "; SameSite=Strict; secure; HttpOnly";
exports.generateSessionTokenCookieHeader = generateSessionTokenCookieHeader;
//# sourceMappingURL=cookie.js.map