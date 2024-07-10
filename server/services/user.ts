import { Service } from 'typedi';
import UserModel from '../models/user.js';
import { IUser } from '../interfaces/IUser.js';
import Base from './base.js';

@Service()
export default class UserService extends Base<typeof UserModel, IUser> {
  constructor() {
    super(UserModel);
  }

  findByEmail(email) {
    return this.model.findOne({ email }).select('email first_name last_name').lean();
  }

  updateMyProfile(userId, dto) {
    const filteredDTO = { 
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
     };
     return this.model.updateOne({ _id: userId }, { $set: { ...filteredDTO } });
  }
  async deleteAccount(userId) {
    return this.model.deleteOne({ _id: userId });
  }
  
}
