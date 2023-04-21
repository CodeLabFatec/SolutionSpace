import CryptoJS from "crypto-js";

export function dataEncrypt(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, process.env.ENCRYPTORPRIVATEKEY as string, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
}

export function dataDecript(data: string): string {
    const decrypted = CryptoJS.AES.decrypt(data, process.env.ENCRYPTORPRIVATEKEY as string);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export function comparePassword(password: string, userPassword: string): boolean {
    const userPass = dataDecript(userPassword)

    if (userPass !== password) return false

    return true
}