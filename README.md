# node-security
I created this package as a centralized repo for security functions generally needed for server-side development.

## Two-Factor-Authentication

### Generate 2FA secret and otpauth url

```
generate2faSecret(issuer: string, name: string) -> { url: string, secret: string }
```

### Generate 2FA QR code data URL

```
generate2faQrCode(url: string) -> Promise<string>
```

### Verify 2FA token

```
verify2faToken(secret: string, token: string) -> boolean
```

## CSRF

### Generate CSRF token

```
generateCsrfToken() -> string
```

## Hashing

### Hash

```
hash(data: string|Buffer, inputEncoding?: Encoding) -> Buffer
```

### HMAC

```
hmac(secret: string|Buffer, data: string|Buffer, inputEncoding?: Encoding) -> Buffer
```

## Http message signature verification

### Verify http message signature (hex encoded hmac)

```
verifyMessageSignature(
  secret: string,
  maxAge: number,
  signature: string,
  components: {
    httpMethod: string;
    httpPath: string;
    apiKey: string;
    nonce: string;
    timestamp: number;
    payload?: string;
  }
) -> boolean
```

## Passwords

### Hash password

```
hashPassword(password: string) -> Promise<string>
```

### Verify password

```
verifyPassword(password: string, hash: string) -> Promise<boolean>
```

## Session ids and tamper-proof login tokens

### Generate session id

```
generateSessionId() -> string
```

### Generate signed session token for use in cookie

```
generateSessionToken(secret: string, sessionId: string) -> string
```

### Extract session id from session token

```
getSessionIdFromSessionToken(secret: string, token: string) -> IOptional<string>
```

## Symmetric encryption

### Generate key

```
generateSymmetricKey() -> string
```

### Encrypt

```
symmetricEncrypt(key: string, data: string) -> string
```

### Decrypt

```
symmetricDecrypt(key: string, data: string) -> string
```
