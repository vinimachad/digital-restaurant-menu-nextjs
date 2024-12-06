import { Client, QueryConfig } from "pg";

export default {
  query,
};

async function query(query: string | QueryConfig<any[]>) {
  let client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
  });

  try {
    await client.connect();
    return await client.query(query);
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}
