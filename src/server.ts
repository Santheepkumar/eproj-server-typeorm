import "reflect-metadata";
import { createConnection } from "typeorm";
import app, { router } from "./config/express";

app.get("/api-test", (_, res) => res.send("Hello World"));

const PORT = process.env.API_PORT;
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  try {
    await createConnection();
    console.log("Database connected!");
  } catch (err) {
    console.log(err);
  }
});
