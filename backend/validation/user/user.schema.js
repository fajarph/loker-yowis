const Joi = require('joi')

const schema = {
    create: Joi.object({
        email: Joi.string().max(255).required().messages({
            "any.required": "Email is required!!",
            "string.empty": "Email can't be empty!!",
            'string.max': 'Email length must be less than or equal to {{#limit}} characters long'
        }),
        password: Joi.string().min(8).max(16).required().messages({
            "any.required": "Password is required!!",
            "string.empty": "Password can't be empty!!",
            'string.min': 'Password length must be at least {{#limit}} characters long',
            'string.max': 'Password length must be less than or equal to {{#limit}} characters long',
        }),
        confPassword: Joi.string().min(8).max(16).required().messages({
            "any.required": "Confirm password is required!!",
            "string.empty": "Confirm password can't be empty!!",
            'string.min': 'Confirm password length must be at least {{#limit}} characters long',
            'string.max': 'Confirm password length must be less than or equal to {{#limit}} characters long',
        }),
        role: Joi.string().required().messages({
            "any.required": "Role is required!!",
            "string.empty": "Role can't be empty!!"
        })
    })
    .options({abortEarly: false})
}

module.exports = schema