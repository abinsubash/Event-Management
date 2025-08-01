export const env = {
  get FRONTEND_URL(): string {
    const FRONTEND_URL = process.env.FRONTEND_URL;
    if (!FRONTEND_URL) {
      throw new Error("FRONTEND_URL is not defined in environment variables");
    }
    return FRONTEND_URL;
  },
  get MONGO_URI(): string {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    return uri;
  },
  get PASSKEY(): string {
    const PASSKEY = process.env.PASSKEY;
    if (!PASSKEY) {
      throw new Error("PASSKEY not defined in environment vaiable");
    }
    return PASSKEY;
  },
  get SENDER_EMAIL(): string {
    const SENDER_EMAIL = process.env.SENDER_EMAIL;
    if (!SENDER_EMAIL) {
      throw new Error("SENDER_EMAIL not defined in environment vaiable");
    }
    return SENDER_EMAIL;
  },
  get REDIS_PASSWORD(): string {
    const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
    if (!REDIS_PASSWORD) {
      throw new Error("REDIS_PASSWORD not defined in environment vaiable");
    }
    return REDIS_PASSWORD;
  },
  get REDIS_HOST(): string {
    const REDIS_HOST = process.env.REDIS_HOST;
    if (!REDIS_HOST) {
      throw new Error("REDIS_HOST not defined in environment vaiable");
    }
    return REDIS_HOST;
  },
  get REDIS_PORT(): string {
    const REDIS_PORT = process.env.REDIS_PORT;
    if (!REDIS_PORT) {
      throw new Error("REDIS_PORT not defined in environment vaiable");
    }
    return REDIS_PORT;
  },
  get JWT_ACCESS_SECRET(): string {
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
    if (!JWT_ACCESS_SECRET) {
      throw new Error("JWT_ACCESS_SECRET not defined in environment vaiable");
    }
    return JWT_ACCESS_SECRET;
  },
  get JWT_REFRESH_SECRET(): string {
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    if (!JWT_REFRESH_SECRET) {
      throw new Error("JWT_REFRESH_SECRET not defined in environment vaiable");
    }
    return JWT_REFRESH_SECRET;
  },
};
