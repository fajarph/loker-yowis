const Joi = require('joi')

const schema = {
    create: Joi.object({
        companyName: Joi.string().max(50).required().messages({
            "string.empty": "Company name can't be empty!!",
            'string.max': 'Company name length must be less than or equal to {{#limit}} characters long'
        }),
        companyAddress: Joi.string().max(255).required().messages({
            "string.empty": "Company address can't be empty!!",
            'string.max': 'Company address length must be less than or equal to {{#limit}} characters long'
        }),
        LocationId: Joi.string().required().messages({
            "any.required": "Location is required!!",
            "string.empty": "Location can't be empty!!"
        }),
        salary: Joi.string().max(255).required().messages({
            "any.required": "Salary is required!!",
            "string.empty": "Salary can't be empty!!"
        }),
        RoleId: Joi.string().required().messages({
            "any.required": "Role is required!!",
            "string.empty": "Role can't be empty!!"
        }),
        LevelId: Joi.string().required().messages({
            "any.required": "Level is required!!",
            "string.empty": "Level can't be empty!!"
        }),
        EducationId: Joi.string().required().messages({
            "any.required": "Education is required!!",
            "string.empty": "Education can't be empty!!"
        }),
        jobType: Joi.string().required().messages({
            "any.required": "Job type is required!!",
            "string.empty": "Job type can't be empty!!"
        }),
        jobShortDescription: Joi.string().required().messages({
            "any.required": "Description is required!!",
            "string.empty": "Description can't be empty!!"
        }),
        jobLongDescription: Joi.string().required().messages({
            "any.required": "Description is required!!",
            "string.empty": "Description can't be empty!!"
        }),
        file: Joi.string().messages({
            "any.required": "Image is required!!",
            "string.empty": "Image can't be empty!!"
        })
    })
    .options({abortEarly: false})
}

module.exports = schema