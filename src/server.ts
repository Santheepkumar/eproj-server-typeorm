import "reflect-metadata";
import app from "./config/express";
import env from "./config/env.config";
import connection from "./config/connection";

app.get("/api-test", (_, res) => res.send("Hello World"));

const PORT = env.API_PORT;
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  try {
    await connection.create();
    console.log("Database connected!");
  } catch (err) {
    console.log(err);
  }
});
