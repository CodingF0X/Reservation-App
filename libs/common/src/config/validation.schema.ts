import * as Joi from 'joi';

export const validationSchema = Joi.object({
  //   STAGE: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
});
