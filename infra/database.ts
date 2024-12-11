import { Client, QueryConfig } from "pg";

async function query(query: string | QueryConfig<any[]>) {
  let client: Client;

  try {
    client = await getNewClient();
    return await client.query(query);
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return { ca: process.env.POSTGRES_CA };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
