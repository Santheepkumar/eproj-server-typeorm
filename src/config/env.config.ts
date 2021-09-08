import Joi from "joi";
import * as dotenv from "dotenv";
import path from "path";

// require and configure dotenv, will load vars in .env in PROCESS.ENV
let env = "";
if (process.env.NODE_ENV) {
  env = process.env.NODE_ENV;
}

dotenv.config({
  path: path.resolve(__dirname, "..", "..", `${env}.env`),
});

// define validation for all the env vars
const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow("development", "production", "test")
    .default("development"),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  API_PORT: Joi.number().default(4000),
  DB_HOST: Joi.string().required().description("Mongo DB host url"),
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
