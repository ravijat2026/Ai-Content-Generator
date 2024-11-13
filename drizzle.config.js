/** @type { import("drizzle-kit").Config} */
import 'dotenv/config';

export default {
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
};
