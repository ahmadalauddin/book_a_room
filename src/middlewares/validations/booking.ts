
import DateExtension from '@joi/date';
import * as JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

const checkBookingPayload = function (req: any, res: any, next: any) {
    let schema = Joi.object({
        roomId: Joi.number().required(),
        userId: Joi.number().required(),
        date: Joi.date().format("YYYY-MM-DD").required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        res.status(422).json(error.message);
    }
    else {
        next();
    }
}

export default checkBookingPayload;