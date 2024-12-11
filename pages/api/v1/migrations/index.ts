import migrationRunner, { RunnerOption } from "node-pg-migrate";
import * as path from "node:path";
import { NextApiRequest, NextApiResponse } from "next";
import database from "@infra/database";
import { Client } from "pg";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const allowedMethods = ["GET", "POST"];
  if (allowedMethods.includes(req.method) == false)
    return res
      .status(405)
      .json({ error: { developerMessage: `${req.method} is not allowed` } });

  let dbClient: Client;
  try {
    dbClient = await database.getNewClient();
    const isGetRequest = req.method === "GET";
    const dryRun = isGetRequest;
    const migrationRunnerOptions: RunnerOption = {
      dbClient: dbClient,
      dir: path.join("infra", "migrations"),
      direction: "up",
      dryRun: dryRun,
      migrationsTable: "pgmigrations",
      verbose: true,
    };

    const migrations = await migrationRunner(migrationRunnerOptions);
    if (migrations.length > 0 && isGetRequest == false) {
      return res.status(201).json(migrations);
    }

    return res.status(200).json(migrations);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
