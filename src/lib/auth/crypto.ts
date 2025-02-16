import crypto from "crypto";

const algorithm = "aes-256-gcm";

export const encrypt = (text: string) => {
  try {
    const secretKey = Buffer.from(process.env.ENCRYPTION_KEY!, "base64");
    const iv = crypto.randomBytes(12).toString("base64");
    const cipher = crypto.createCipheriv(
      algorithm,
      secretKey,
      Buffer.from(iv, "base64")
    );
    let ciphertext = cipher.update(text, "utf8", "base64");
    ciphertext += cipher.final("base64");
    const tag = cipher.getAuthTag().toString("base64");
    return `${iv}:${ciphertext}:${tag}`;
  } catch (error) {
    console.error("Error during encryption:", error);
    throw new Error("Encryption failed");
  }
};

export const decrypt = (hash: string) => {
  try {
    const secretKey = Buffer.from(process.env.ENCRYPTION_KEY!, "base64");
    const [iv, ciphertext, tag] = hash?.split(":");
    if (!iv || !ciphertext || !tag) {
      throw new Error("Invalid hash format");
    }

    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(iv, "base64")
    );
    decipher.setAuthTag(Buffer.from(tag, "base64"));
    let plaintext = decipher.update(ciphertext, "base64", "utf8");
    plaintext += decipher.final("utf8");

    return plaintext;
  } catch (error) {
    console.error("Error during decryption:", error);
    throw new Error("Decryption failed");
  }
};
