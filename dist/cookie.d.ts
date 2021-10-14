import { IOptional } from "@bcg-ts/ts-toolkit";
export declare const generateSessionCookieHeader: (secret: string, sessionId: string) => string;
export declare const getSessionIdFromCookie: (secret: string, cookie: string) => IOptional<string>;
