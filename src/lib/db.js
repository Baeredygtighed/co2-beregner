import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
	throw new Error("Please define the MONGO_URI environment variable inside .env.local")
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

export async function connect() {
	if (cached.conn) return cached.conn

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}

		cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
			return mongoose
		})
	}

	try {
		cached.conn = await cached.promise
	} catch (error) {
		cached.promise = null
		throw new Error(error)
	}

	return cached.conn
}
