import { Service } from "typedi";
import AuthSrevice from "../../services/auth.js";
import { Request, Response } from "express";

@Service()
export default class AuthController {
  constructor(private service: AuthSrevice) {
  }

  async signUp(req: Request, res: Response) {
    try {
      
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }
}
