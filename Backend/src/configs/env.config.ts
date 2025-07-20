export const env = {
  get FRONTEND_URL(): string {
    return process.env.FRONTEND_URL || "http://localhost:5173";
  },
};
