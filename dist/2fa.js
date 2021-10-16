"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify2faToken = exports.generate2faQrCode = exports.generate2faSecret = void 0;
const ts_toolkit_1 = require("@bcg-ts/ts-toolkit");
const qrcode_1 = require("qrcode");
const speakeasy = require("speakeasy");
const generate2faSecret = (issuer, name) => {
    const secret = speakeasy.generateSecret({
        issuer,
        name,
    });
    if (secret.otpauth_url == null) {
        throw new Error("failed to generate 2FA secret");
    }
    return {
        url: secret.otpauth_url,
        secret: secret.hex,
    };
};
exports.generate2faSecret = generate2faSecret;
const generate2faQrCode = (url) => new Promise((resolve, reject) => {
    (0, qrcode_1.toDataURL)(url, (err, dataUrl) => {
        if (err) {
            reject((0, ts_toolkit_1.normalizeError)(err));
        }
        else {
            resolve(dataUrl);
        }
    });
});
exports.generate2faQrCode = generate2faQrCode;
const verify2faToken = (secret, token) => speakeasy.totp.verify({
    secret,
    encoding: "hex",
    token,
    window: 6,
});
exports.verify2faToken = verify2faToken;
//# sourceMappingURL=2fa.js.map