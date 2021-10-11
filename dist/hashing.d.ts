/// <reference types="node" />
import { Encoding } from "crypto";
export declare const hash: (data: string | Buffer, inputEncoding?: Encoding | undefined) => Buffer;
export declare const hmac: (secret: string | Buffer, data: string | Buffer, inputEncoding?: Encoding | undefined) => Buffer;
