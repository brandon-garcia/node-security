import {normalizeError} from "@bcg-ts/ts-toolkit";
import {toDataURL} from "qrcode";
import * as speakeasy from "speakeasy";

export interface TwoFactorAuthSecret {
  readonly url: string;
  readonly secret: string;
}

export const generate2faSecret = (issuer: string, name: string): TwoFactorAuthSecret => {
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

export const generate2faQrCode = (url: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    toDataURL(url, (err, dataUrl) => {
      if (err) {
        reject(normalizeError(err));
      } else {
        resolve(dataUrl);
      }
    })
  });

export const verify2faToken = (secret: string, token: string): boolean =>
  speakeasy.totp.verify({
    secret,
    encoding: "hex",
    token,
    window: 6,
  });
