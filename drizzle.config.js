/** @type { import("drizzle-kit").Config} */
import 'dotenv/config';

export default {
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://AI-Content-Generator_owner:Q2jTxYcpkCg6@ep-autumn-butterfly-a118wnx6.ap-southeast-1.aws.neon.tech/AI-Content-Generator?sslmode=require',
  },
};
