export interface IMessageSignatureComponents {
    readonly httpMethod: string;
    readonly httpPath: string;
    readonly apiKey: string;
    readonly nonce: string;
    readonly timestamp: number;
    readonly payload?: string;
}
export declare const verifyMessageSignature: (secret: string, maxAge: number, signature: string, components: IMessageSignatureComponents) => boolean;
