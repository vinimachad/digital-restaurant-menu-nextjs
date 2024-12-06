describe("GET to /api/v1/status", () => {
  test("when has success should return status 200 and response", async () => {
    const res = await fetch("http://localhost:3000/api/v1/status");
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toEqual({ message: "hello" });
  });
});
