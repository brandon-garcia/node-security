import * as argon2 from "argon2"

export const hashPassword = (password: string): Promise<string> =>
  argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
  });

export const verifyPassword = (password: string, hash: string): Promise<boolean> =>
  argon2.verify(hash, password);
