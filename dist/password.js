"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const argon2 = require("argon2");
const hashPassword = (password) => argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
});
exports.hashPassword = hashPassword;
const verifyPassword = (password, hash) => argon2.verify(hash, password);
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=password.js.map