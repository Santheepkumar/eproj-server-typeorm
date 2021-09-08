module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_NAME,
  password: "postgres",
  database: "new-orm",
  synchronize: true,
  logging: true,
  entities: ["src/server/**/*entity.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/server/**",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscribers",
  },
};
