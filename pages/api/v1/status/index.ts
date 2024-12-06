import database from "@infra/database";
import { NextApiRequest, NextApiResponse } from "next";

export type APIStatusResponse = {
  updated_at: string;
  dependencies: {
    postgres_version: string;
    max_connections: number;
    opened_connections: number;
  };
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const databaseName = process.env.POSTGRES_DB;
  const maxConnections = await database.query("SHOW max_connections");
  const postgresVersion = await database.query("SHOW server_version");
  const openedConnections = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1`,
    values: [databaseName],
  });

  const results: APIStatusResponse = {
    updated_at: new Date().toUTCString(),
    dependencies: {
      max_connections: Number(maxConnections.rows[0].max_connections),
      opened_connections: openedConnections.rows[0].count,
      postgres_version: postgresVersion.rows[0].server_version,
    },
  };
  response.status(200).json(results);
}
