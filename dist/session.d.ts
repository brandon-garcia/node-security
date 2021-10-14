import { IOptional } from "@bcg-ts/ts-toolkit";
export declare const generateSessionId: () => string;
export declare const generateSessionToken: (secret: string, sessionId: string) => string;
export declare const getSessionIdFromSessionToken: (secret: string, token: string) => IOptional<string>;
