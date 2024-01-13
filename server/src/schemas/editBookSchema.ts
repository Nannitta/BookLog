import Joi from 'joi';

const editBookSchema = Joi.object({
  title: Joi.string().min(2).max(100).messages({
    'string.empty': 'El título del libro no puede estar vacío',
    'string.min': 'El título del libro debe tener mínimo 2 caracteres.',
    'string.max': 'El título del libro no puede tener más de 50 caracteres.'
  }),
  author: Joi.string().min(2).max(100).pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).messages({
    'string.empty': 'El nombre del autor no puede estar vacío',
    'string.min': 'El nombre del autor debe tener mínimo 2 caracteres.',
    'string.max': 'El nombre del autor no puede tener más de 50 caracteres.',
    'string.pattern.base': 'El nombre del autor solo puede cotener letras'
  }),
  resume: Joi.string().min(2).messages({
    'string.empty': 'La sinopsis del libro no puede estar vacía',
    'string.min': 'La sinopsis del libro debe tener mínimo 2 caracteres.'
  }),
  editorial: Joi.string().min(2).max(50).messages({
    'string.empty': 'El nombre de la editorial no puede estar vacío',
    'string.min': 'El nombre de la editorial debe tener mínimo 2 caracteres.',
    'string.max': 'El nombre de la editorial no puede tener más de 50 caracteres.'
  }),
  yearRelease: Joi.string().min(4).max(4).pattern(/^\d/).messages({
    'string.empty': 'El año de publicación no puede estar vacío',
    'string.min': 'El año de publicación debe tener mínimo 4 caracteres.',
    'string.max': 'El año de publicación no puede tener más de 4 caracteres.',
    'any.required': 'El año de publicación es obligatorio.'
  })
});

export default editBookSchema;