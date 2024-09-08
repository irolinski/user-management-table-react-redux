import { describe, expect, it } from "vitest";

describe("Check if API URI is active", () => {
  it("should return statusCode = 200", async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    expect(res.status).toBe(200);
  });

  it("should fetch 10 or more users", async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const arrOfUsers = await res.json().then((data) => data);
    expect(arrOfUsers.length).toBeGreaterThanOrEqual(10);
  });
});
