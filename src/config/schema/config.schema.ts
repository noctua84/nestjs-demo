import Joi, { ObjectSchema } from 'joi';

export const validationSchema: ObjectSchema<any> = Joi.object({
  app: {
    name: Joi.string().default('NestJS-Demo'),
    version: Joi.string().default('1.0.0'),
    description: Joi.string().default(
      'NestJS-Demo API to demonstrate the use of NestJS and develop into a template for future projects.',
    ),
    host: Joi.string().default('localhost'),
    port: Joi.number().default(3000),
  },
  // TODO: Add more config options and finish the schema up to the point where it can be used to validate the config file.
});
