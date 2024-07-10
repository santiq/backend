import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { Service } from "typedi";
import UserService from "./user.js";

@Service()
export default class AuthService {
  constructor(
    private userService: UserService,
  ) {}

  async generateSession(user: any) {
    
  }

  async generateToken() {
    
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      throw new Error("User not found");
    }
    const dbPassword = user?.password;

    const validPassword = await argon2.verify(dbPassword, password);

    if (!validPassword) throw new Error("Invalid Password");

    const token = await this.generateSession({ ...user, password: undefined });

    return {
      user: {
        ...user,
        password: undefined,
      },
      token,
    };
  }

  async changePassword(user, password, newPass) {
    const _dbUser = await this.userService.findById(user._id);
    if (!_dbUser) throw new Error("User not found");
    const dbPassword = _dbUser.password;
    if (!dbPassword)
      throw new Error("User doesn't have a password in db document");
    const validPassword = await argon2.verify(dbPassword, password);
    if (!validPassword) throw new Error("Invalid Credentials");
    const hashedPassword = await argon2.hash(newPass);
    await this.userService.updateById(_dbUser._id.toString(), {
      password: hashedPassword,
    });
    return { success: true };
  }


  async signUp(userDTO: any, isOAuth: boolean = false) {
    const searchObj: any = { email: userDTO.email };

    let user = await this.userService.findOne(searchObj);

    if (!user) {
      if (!userDTO.password) throw new Error("UserDTO doesn't have a password");
      userDTO.password = await this.hashPassword(userDTO.password);
      user = await this.userService.create(userDTO);
    }

    const token = await this.generateSession({ ...user, userId: user._id });
    user = { ...user, password: undefined };

    return { token, user };
  }

  private hashPassword(password: string): Promise<string> {
    try {
      return argon2.hash(password);
    } catch (error) {
      throw new Error("Error hashing password account");
    }
  }

}
