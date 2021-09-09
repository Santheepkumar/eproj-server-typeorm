import Joi from "joi";
import * as dotenv from "dotenv";
import path from "path";
import { existsSync } from "fs";

// require and configure dotenv, will load vars in .env in PROCESS.ENV
let env = "";
if (process.env.NODE_ENV) {
  env = process.env.NODE_ENV;
}

// if (!existsSync(path.resolve(__dirname, "..", "..", `${env}.env`))) {
//   throw new Error("No corresponding env file spesified");
// }

dotenv.config({
  path: path.resolve(__dirname, "..", "..", `${env}.env`),
});

// define validation for all the env vars
const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow("development", "production", "test")
    .default("development"),
  DB_NAME: Joi.alternatives().conditional("NODE_ENV", {
    is: "development" || "production",
    then: Joi.string().required(),
  }),
  DB_PORT: Joi.alternatives().conditional("NODE_ENV", {
    is: "development" || "production",
    then: Joi.number().required(),
  }),
  API_PORT: Joi.number().default(4000),
  DB_HOST: Joi.alternatives().conditional("NODE_ENV", {
    is: "development" || "production",
    then: Joi.string().required(),
  }),
  TEST_DB_URI: Joi.string(),
  JWT_SECRET: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = configSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export default envVars;
