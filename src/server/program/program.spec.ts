import connection from "../../config/connection";
import request from "supertest";
import app from "../../config/express";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

it("creates a program POST /api/v1/program", (done) => {
  request(app)
    .post("/api/v1/program")
    .send({
      title: "Program 1",
      description: "Program 1 description",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, _res) {
      if (err) return done(err);
      return done();
    });
});
