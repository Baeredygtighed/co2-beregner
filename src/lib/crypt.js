import crypto from "crypto"

const { SECRET_KEY, RANDOM_IV, ALGORITHM } = process.env

const key = crypto
	.createHash("sha512")
	.update(SECRET_KEY)
	.digest("hex")
	.substring(0, 32)

const encryptionIV = crypto
	.createHash("sha512")
	.update(RANDOM_IV)
	.digest("hex")
	.substring(0, 16)

export function encrypt(data) {
	const cipher = crypto.createCipheriv(ALGORITHM, key, encryptionIV)
	return Buffer.from(
		cipher.update(data, "utf8", "hex") + cipher.final("hex")
	).toString("base64")
}

export function decrypt(data) {
	const buff = Buffer.from(data, "base64")
	const decipher = crypto.createDecipheriv(ALGORITHM, key, encryptionIV)
	return (
		decipher.update(buff.toString("utf8"), "hex", "utf8") +
		decipher.final("utf8")
	)
}
