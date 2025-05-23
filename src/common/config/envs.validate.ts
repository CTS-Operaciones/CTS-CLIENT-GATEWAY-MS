import 'dotenv/config';
import * as joi from 'joi';

interface IEnvsVars {
  PORT_APP: number;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT_APP: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Envs invalidos: ${error.message}`);
}

const envsVars: IEnvsVars = value;

export const envs = {
  PORT_APP: envsVars.PORT_APP,
  NATS_SERVERS: envsVars.NATS_SERVERS,
};
