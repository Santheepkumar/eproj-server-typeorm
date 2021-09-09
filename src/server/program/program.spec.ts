import connection from "../../config/connection";
import request from "supertest";
import app from "../../config/express";
import { getConnection } from "typeorm";
import Program from "./program.entity";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

describe("POST /api/v1/program", function () {
  it("creates a program", () => {
    const programData: any = {
      title: "Program 2",
      description: "Program 2 description",
    };
    request(app)
      .post("/api/v1/program")
      .send(programData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(Object.keys(res.body).length > 0).toBeTruthy();

        // Check data
        expect(res.body.title).toBe(programData.title);
        expect(res.body.description).toBe(programData.description);
      });
  });
});

describe("GET /api/v1/programs", function () {
  it("responds with json", async function () {
    const program = new Program({
      title: "Program 3",
      description: "Program 3 description",
    });

    const result = await program.save();

    await request(app)
      .get("/api/v1/program/programs")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(2);

        // Check data
        expect(res.body[1].title).toBe(result.title);
        expect(res.body[1].description).toBe(result.description);
      });
  });
});
