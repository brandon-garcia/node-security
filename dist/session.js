"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSessionId = void 0;
const crypto_1 = require("crypto");
const generateSessionId = () => (0, crypto_1.randomBytes)(32).toString("hex");
exports.generateSessionId = generateSessionId;
//# sourceMappingURL=session.js.map