import DateExtension from '@joi/date';
import * as JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

const checkAvailableRooms = function(req:any, res:any, next:any) {
  let schema = Joi.object({
    date: Joi.date().format("YYYY-MM-DD").required()
  });

  const { error } = schema.validate(req.params);
  
  if (error) {
    res.status(422).json(error.message); 
  }
  else{
    next();
  }
}

export default checkAvailableRooms;