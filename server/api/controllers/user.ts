import { Inject, Service } from "typedi";
import { IUser } from "../../interfaces/IUser.js";
import UserModel from "../../models/user.js";
import BaseController from "./base.js";
import UserService from "../../services/user.js";
import { Request, Response } from "express";

@Service()
export default class UserController extends BaseController<
  UserService,
  typeof UserModel,
  IUser
> {
  constructor(service: UserService) {
    super(service);
  }

  async deleteMyAccount(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      const result = await this.service.deleteAccount(userId);
      return res.status(200).json(result);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  override async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const isAdmin = req.query.isAdmin;
      const isTeam = req.query.isTeam;

      let query = {};

      if (isAdmin) {
        query = { admin_id: id };
      } else if (isTeam) {
        query = { team_id: id };
      } else {
        query = { _id: id };
      }

      const result = await this.service.findOne(query);
      return res.status(200).json(result);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  async updateMyProfile(req: Request, res: Response) {
    try {
      const id = req.user?._id;
      const dto = req.body;
      const result = await this.service.updateMyProfile(id, dto);
      return res.status(200).json(result);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  async updateAvatar(req: any, res: Response) {
    try {
      const user = req.user;
      const avatar = req.file.key;
      const result = await this.service.update(
        { _id: user._id },
        { avatar: avatar }
      );
      return res.status(201).json(result);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  async existsByEmail(req: Request, res: Response) {
    try {
      const email = req.query.email;
      const result = await this.service.findByEmail(email);
      return res.status(200).json({ exists: !!result, user: result });
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

}
