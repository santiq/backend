import mongoose, { ObjectId, FilterQuery } from "mongoose";
import { Service } from "typedi";

@Service()
class Base<T extends mongoose.Model<I & mongoose.Document>, I> {
  constructor(public model: T) {}

  // This is just for ts compilation problems, it does not change the default behavior.
  async getAll(...args: any): Promise<any>;
  async getAll(
    q: FilterQuery<mongoose.Model<I & mongoose.Document>> = {},
    limit?: number,
    sort?: any
  ) {
    let query = this.model.find(q);
    if (limit) {
      query.limit(limit);
    }
    if (sort) {
      query.sort(sort);
    }
    return query.lean();
  }

  async search(
    page: number,
    pageSize: number,
    sortBy: string = "_id",
    sortDirection: mongoose.SortOrder = -1,
    populate: any = []
  ) {
    const skip = (page - 1) * pageSize;

    const query = {};

    const unpopulated = await this.model
      .find(query)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .lean();
    let data: object[];

    if (populate.length) {
      data = await this.model.populate(unpopulated, populate);
    } else {
      data = unpopulated;
    }

    const amountOfDocuments = await this.count(query);
    return { data, pages: Math.ceil(amountOfDocuments / pageSize) };
  }

  async getOne(q: any) {
    return this.model.findById(q).lean();
  }

  async findOne(q: any, populate: any = []) {
    let unpopulated = await this.model.findOne(q).lean();
    let data: any;
    if (populate.length) {
      data = await this.model.populate(unpopulated, populate);
    } else {
      data = unpopulated;
    }
    return data;
  }

  async getFieldValues(field: string) {
    return this.model.distinct(field);
  }

  async getByName(name: string) {
    return this.model.findOne({ name } as any).lean();
  }

  async getById(id: string) {
    return this.findById(id);
  }

  async findByArgs(args) {
    return this.findOne(args);
  }

  async findById(id: string) {
    return this.model.findById(id).lean();
  }

  async count(filter) {
    return this.model.countDocuments(filter);
  }

  async remove(q) {
    return this.model.deleteOne(q);
  }

  async removeBy(q) {
    return this.model.deleteMany(q);
  }

  async removeById(id) {
    return this.model.deleteOne({ _id: id });
  }

  async removeMany(ids: string[]) {
    return this.model.deleteMany({ _id: { $in: ids } as any });
  }

  async updateById(id: string | ObjectId, update) {
    return this.model.updateOne({ _id: id } as any, { $set: { ...update } });
  }

  async updateMany(ids: string[], update) {
    return this.model.updateMany({ _id: { $in: ids } } as any, {
      $set: { ...update },
    });
  }


  async update(q, update) {
    return this.model.updateOne(q, { $set: { ...update } });
  }


  async findOneAndUpdate(q, update, options) {
    return this.model.findOneAndUpdate(q, { $set: { ...update } }, options);
  }


  async create(object) {
    return this.model.create({ ...object });
  }

}

export default Base;
