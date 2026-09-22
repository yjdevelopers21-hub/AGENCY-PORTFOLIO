import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

/**
 * Global cache interface to maintain connection across HMR (Hot Module Replacement)
 * in Next.js development and serverless invocations.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI || MONGODB_URI;

  if (!uri || uri.trim() === '') {
    return null;
  }

  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB Atlas Connection Error:', error);
    return null;
  }
}

export function isDatabaseConfigured(): boolean {
  const uri = process.env.MONGODB_URI || MONGODB_URI;
  return Boolean(uri && uri.trim().startsWith('mongodb'));
}

export function getDatabaseState(): {
  isConfigured: boolean;
  isConnected: boolean;
  stateText: string;
} {
  const isConfigured = isDatabaseConfigured();
  const readyState = mongoose.connection.readyState;
  const isConnected = readyState === 1;

  let stateText = 'Not Configured';
  if (isConfigured) {
    switch (readyState) {
      case 0:
        stateText = 'Disconnected';
        break;
      case 1:
        stateText = 'Connected to Atlas';
        break;
      case 2:
        stateText = 'Connecting...';
        break;
      case 3:
        stateText = 'Disconnecting...';
        break;
      default:
        stateText = 'Unknown';
    }
  }

  return {
    isConfigured,
    isConnected,
    stateText,
  };
}
