import { validate as classValidate } from "class-validator";
import User from "../server/auth/user.entity";

const validate = (entity: User): any => {
  return classValidate(entity, { validationError: { target: false } }).then(
    (e) => {
      if (e && e.length > 0) {
        return e.map((err) => ({
          [err.property]: err.constraints,
        }));
      }
      return [];
    }
  );
  // return;
};

export default validate;
