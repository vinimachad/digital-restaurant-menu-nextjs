import database from "@infra/database";

beforeAll(clearDatabase);

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function fetchMigrations() {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const data = await response.json();
  return { data, response };
}

test("POST to /api/v1/migrations should return 200", async () => {
  const { data, response } = await fetchMigrations();
  const { data: data2, response: res2 } = await fetchMigrations();

  expect(response.status).toBe(201);
  expect(Array.isArray(data)).toEqual(true);
  expect(data.length).toBeGreaterThan(0);

  expect(res2.status).toBe(200);
  expect(Array.isArray(data2)).toEqual(true);
  expect(data2.length).toEqual(0);
});
