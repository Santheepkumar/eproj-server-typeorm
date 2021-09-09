import env from "./src/config/env.config";

module.exports = [
  {
    name: "development",
    type: "postgres",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_NAME,
    password: "postgres",
    database: "new-orm",
    synchronize: true,
    logging: true,
    entities: ["src/server/**/*entity.ts"],
    migrations: ["src/migrations/**/*.ts"],
    seeds: ["src/seeders/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
    cli: {
      entitiesDir: "src/server/**",
      migrationsDir: "src/migrations",
      subscribersDir: "src/subscribers",
    },
  },
  {
    name: "test",
    type: "postgres",
    url: env.TEST_DB_URI,
    entities: ["src/server/**/*entity.ts"],
    migrations: ["src/migrations/**/*.ts"],
    seeds: ["src/seeders/**/*.ts"],
    logging: true,
    // synchronize: true,
  },
];
