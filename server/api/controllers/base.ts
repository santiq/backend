import { Request, Response } from "express";
import Base from "../../services/base.js";
import mongoose, { SortOrder } from "mongoose";
import { Service } from "typedi";

@Service()
class BaseController<
  C extends Base<T, I>,
  T extends mongoose.Model<I & mongoose.Document>,
  I
> {

  constructor(public service: C) {}

  async getAll(req: Request, res: Response) {
    try {
      const q = {};
      if (Object.keys(req.query).length) {
        for (let [key, value] of Object.entries(req.query)) {
          q[key] = value;
        }
      }
      const result = await this.service.getAll(q);
      return res.status(200).json(result);
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error : ", e.message, e.stack);
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  async search(req: Request, res: Response) {
    try {
      const page = parseInt((req.query.page as string) || "1");
      const search = req.query?.search
        ? JSON.parse(req.query.search as string)
        : { name: "" };

      const sortBy = req.query.sortBy as string;
      const sortDirection = parseInt(
        (req.query.sortDirection as string) || "1"
      );
      const pageSize = parseInt((req.query.pageSize as string) || "50");
      let filterGroups = JSON.parse((req.query.filterGroups as string) || "[]");
      let populate = JSON.parse((req.query.populate as string) || "[]");
      if (typeof filterGroups === "string") {
        filterGroups = JSON.parse(filterGroups);
        if (typeof filterGroups !== "object") {
          filterGroups = [];
        }
      }
      const result = await this.service.search(
        filterGroups,
        page,
        sortBy,
        sortDirection as SortOrder
      );
      return res.status(200).json(result);
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error : ", e.message, e.stack);
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await this.service.getById(id);
      return res.status(200).json(result);
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error : ", e.message, e.stack);
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const dto = req.body;
      const result = await this.service.updateById(id, dto);

      return res.status(200).json(result);
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error : ", e.message, e.stack);
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  async create(req: Request, res: Response) {
    try {
      const dto = req.body;
      const result = await this.service.create(dto);
      return res.status(200).json(result);
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error : ", e.message, e.stack);
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  async removeById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const item = await this.service.getById(id);
      if(!item) {
        return res.status(404);
      }
      const result = await this.service.removeById(id);

      return res.status(200).json(result);
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error : ", e.message, e.stack);
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }

  async removeMany(req: Request, res: Response) {
    try {
      const ids = JSON.parse(req.query.ids as string) || [];
      const result = await this.service.removeMany(ids);
      return res.status(200).json(result);
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error : ", e.message, e.stack);
        return res.status(500).json({ stack: e.stack, message: e.message });
      }
    }
  }
}

export default BaseController;
