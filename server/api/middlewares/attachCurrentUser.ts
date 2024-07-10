import UserModel from '../../models/user.js';

const attachCurrentUser = async (req, res, next) => {
  try {
   
    return next();
  } catch (e) {
    return next(e);
  }
};

export default attachCurrentUser;
