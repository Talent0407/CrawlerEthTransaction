jest.useFakeTimers();
import request from "supertest";
import app from "../src/app";
import { expect } from "chai";

describe("POST /crawler", () => {
  let accessToken = "";

  beforeAll(async () => {
    let res = await request(app).post("/login").send({
      email: "justin424w@gmail.com",
      password: "qwer1234",
      address: "0x75628fA3268B818626bA417E6a849034Fbb51Acc",
    });
    console.log("Justin Test", res);
    accessToken = res.body.data.accessToken;

    it("Crawl the transactions of user's wallet", async () => {
      let update_data = { mintQuantity: 76 };
      res = await request(app)
        .post("/crawler")
        .set("Authorization", "bearer " + accessToken)
        .send(update_data)
        .expect(302)
        .end((err, res) => {
          expect(res.error).not.to.be.undefined;
        });
    });
  });
});
