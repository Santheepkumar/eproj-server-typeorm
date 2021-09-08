import path from "path";
import { createConnection, getConnection } from "typeorm";
// import env from "../src/config/env.config";

const connection = {
  async create() {
    await createConnection({
      type: "postgres",
      url: "postgres://postgres:postgres@localhost:5431/testing-torm",
      entities: [path.join(__dirname, "../src/server/**/*entity.ts")],
      migrations: [path.join(__dirname, "../src/migrations/**/*.ts")],
      subscribers: [path.join(__dirname, "../src/subscribers/**/*.ts")],
      logging: true,
      // synchronize: true,
    });
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default connection;
