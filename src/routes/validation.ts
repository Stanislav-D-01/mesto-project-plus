import { celebrate, Joi } from "celebrate";

export const likeValid = celebrate({
  params: Joi.object().keys({
    cardsId: Joi.string().required().id().length(24),
  }),
});

export const deleteCardValid = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().id().length(24),
  }),
});

export const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

export const getUserFromIdValid = celebrate({
  params: Joi.object().keys({ id: Joi.string().required().id().length(24) }),
});

export const updateProfileValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(300),
  }),
});

export const updateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});
