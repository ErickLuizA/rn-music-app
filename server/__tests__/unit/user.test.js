const db = require("../../src/database/connection");
const bcrypt = require("bcrypt");

const hash = bcrypt.hashSync("erick123", 10);

describe("User", () => {
  beforeEach(async () => {
    await db("users").del();
  });

  it("Should encrypt user password", async () => {
    const [id] = await db("users").insert({
      name: "erick",
      avatar: "hahahaha",
      email: "erick@mail.com",
      password: hash,
    });

    const compareHash = await bcrypt.compare("erick123", hash);

    expect(compareHash).toBe(true);
  });
});
