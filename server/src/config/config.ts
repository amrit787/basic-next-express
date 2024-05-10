import * as dotenv from 'dotenv';
import path from 'path';
import joi from 'joi';
import { EnvTypes } from '../types';

dotenv.config({
  path: path.join(process.cwd(), '.env')
});

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: joi.number().default(4000)
  })
  .unknown();

const { value, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(
    `Environment variables are not set properly ${error.message}`
  );
}

export default {
  env: value.NODE_ENV,
  port: value.PORT
} as EnvTypes;
