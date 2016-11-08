export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 4000;
export const HOSTNAME = process.env.HOSTNAME || "localhost";
export const DB_URL = process.env.DB_URL || "mongodb://localhost:27017";
export const DB_NAME = process.env.DB_NAME || "dev-db";
export const HOST = `${HOSTNAME}:${PORT}`;

export const WRITE_API_ENDPOINT = process.env.WRITE_API_ENDPOINT || "https://iwwa-write-api-development.innowatio-aws.com";
