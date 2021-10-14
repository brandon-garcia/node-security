export interface TwoFactorAuthSecret {
    readonly url: string;
    readonly secret: string;
}
export declare const generate2faSecret: (issuer: string, name: string) => TwoFactorAuthSecret;
export declare const generate2faQrCode: (url: string) => Promise<string>;
export declare const verify2faToken: (secret: string, token: string) => boolean;
