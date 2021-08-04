const Joi = require('joi');

class Customer{
    constructor(fName,lName,nID,phone){
        this.fName = fName;
        this.lName = lName;
        this.nID = nID;
        this.phone = phone;
    }
    static customerSchema = Joi.object({
        fName: Joi.string()
            .alphanum()
            .minLength(5)
            .maxLength(50)
            .required(),
        lName: Joi.string()
            .alphanum()
            .minLength(5)
            .maxLength(50)
            .required(),
        nID: Joi.string()
            .numeric()
            .length(10)
            .required(),

        phone: Joi.string()
            .numeric()
            .length(11)
            .required()
    });


    validateCustomer(){
        return customerSchema.validate(this);
    }
}