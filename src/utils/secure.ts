import crypto from "crypto";

function hashPassword(password: string, salt: string): any {
  return new Promise((resolve, reject) =>
    crypto.pbkdf2(password, salt, 25000, 512, "sha256", (err, hashRaw) =>
      err ? reject(err) : resolve(hashRaw.toString("hex"))
    )
  );
}

function generateSalt(): string {
  return crypto.randomBytes(32).toString("hex");
}

export { hashPassword, generateSalt };
