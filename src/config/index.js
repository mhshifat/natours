import "dotenv/config";

const {
  PORT,
  SERVER_URI,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_HOST,
  EMAIL_PORT
} = process.env;

export default {
  app: {
    port: PORT || 5000,
    serverUri: SERVER_URI || "http://localhost"
  },
  db: {
    mongodbUri: MONGODB_URI
  },
  jwt: {
    secret:
      JWT_SECRET ||
      "skjdhkjshdshdsABdksjdkjshdjshdkassgdkASDhkjsghgdisiagfihfksdhfikdfg",
    expires: JWT_EXPIRES_IN || "1d"
  },
  email: {
    user: EMAIL_USER || "988500631761b4",
    pass: EMAIL_PASS || "280e7d436dea1f",
    host: EMAIL_HOST || "smtp.mailtrap.io",
    port: EMAIL_PORT || 25
  }
};
