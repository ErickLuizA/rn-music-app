const request = require("supertest");
const app = require("../../src/app");
const db = require("../../src/database/connection");

// Test for learning purposes, first time doing this, would not trust this if I was you :)

describe("Authentication", () => {
  afterEach(async () => {
    await db.destroy();
  });

  it("Should authenticate with valid credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "erick@mail.com",
      password: "erick123",
    });

    expect(response.status).toBe(200);
  });

  it("Should not authenticate with invalid credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "erick@mail.com",
      password: "erick12345",
    });

    expect(response.status).toBe(401);
  });

  it("Should return jwt token when authenticated", async () => {
    const response = await request(app).post("/login").send({
      email: "erick@mail.com",
      password: "erick123",
    });

    expect(typeof response.body).toBe("object");
  });
});
