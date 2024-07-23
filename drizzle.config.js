/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:Mhltrdv5Y2ya@ep-raspy-feather-a5sqjdr3.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
};