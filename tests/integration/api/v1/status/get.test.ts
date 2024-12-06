import { APIStatusResponse } from "@pages/api/v1/status";

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const { dependencies, updated_at }: APIStatusResponse = await response.json();
  expect(response.status).toBe(200);
  expect(updated_at).toEqual(new Date(updated_at).toUTCString());
  expect(dependencies.max_connections).toEqual(100);
  expect(dependencies.opened_connections).toEqual(1);
  expect(dependencies.postgres_version).toEqual("16.6");
});
