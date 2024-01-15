import Joi from 'joi';

const addBookSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'El título del libro no puede estar vacío',
    'string.min': 'El título del libro debe tener mínimo 2 caracteres.',
    'string.max': 'El título del libro no puede tener más de 50 caracteres.',
    'any.required': 'El título del libro es obligatorio.'
  }),
  author: Joi.string().min(2).max(100).required().pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/).messages({
    'string.empty': 'El nombre del autor no puede estar vacío',
    'string.min': 'El nombre del autor debe tener mínimo 2 caracteres.',
    'string.max': 'El nombre del autor no puede tener más de 50 caracteres.',
    'any.required': 'El nombre del autor es obligatorio.',
    'string.pattern.base': 'El nombre del autor solo puede cotener letras'
  }),
  resume: Joi.string().min(2).required().messages({
    'string.empty': 'La sinopsis del libro no puede estar vacía',
    'string.min': 'La sinopsis del libro debe tener mínimo 2 caracteres.',
    'any.required': 'La sinopsis es obligatoria.'
  }),
  editorial: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'El nombre de la editorial no puede estar vacío',
    'string.min': 'El nombre de la editorial debe tener mínimo 2 caracteres.',
    'string.max': 'El nombre de la editorial no puede tener más de 50 caracteres.',
    'any.required': 'El nombre de la editorial es obligatorio.'
  }),
  yearRelease: Joi.string().min(4).max(4).required().pattern(/^\d/).messages({
    'string.empty': 'El año de publicación no puede estar vacío',
    'string.min': 'El año de publicación debe tener mínimo 4 caracteres.',
    'string.max': 'El año de publicación no puede tener más de 4 caracteres.',
    'any.required': 'El año de publicación es obligatorio.',
    'string.pattern.base': 'El año de publicación solo puede cotener números'
  })
});

export default addBookSchema;