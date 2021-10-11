"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCsrfToken = void 0;
const crypto_1 = require("crypto");
const generateCsrfToken = () => (0, crypto_1.randomBytes)(32).toString("hex");
exports.generateCsrfToken = generateCsrfToken;
//# sourceMappingURL=csrf.js.map