import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// ✅ Type for cached mongoose connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// ✅ Add mongoose to globalThis safely (TypeScript-safe)
let cached: MongooseCache = (global as any).mongoose || {
  conn: null,
  promise: null,
};

(global as any).mongoose = cached;

async function dbConnect(): Promise<typeof mongoose> {
  // If already connected, return existing connection
  if (cached.conn) return cached.conn;

  // If no connection promise exists, create one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  // Wait for the connection to be established
  cached.conn = await cached.promise;
  return cached.conn;
}

// Optional: helpful logs in dev
if (process.env.NODE_ENV !== "production") {
  mongoose.connection.on("connected", () => {
    // eslint-disable-next-line no-console
    console.log("Mongoose connected");
  });
  mongoose.connection.on("error", (err) => {
    // eslint-disable-next-line no-console
    console.error("Mongoose connection error:", err);
  });
  mongoose.connection.on("disconnected", () => {
    // eslint-disable-next-line no-console
    console.log("Mongoose disconnected");
  });
}

export default dbConnect;
