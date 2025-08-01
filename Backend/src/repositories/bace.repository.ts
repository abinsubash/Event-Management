import { Document, Model, Types } from "mongoose";

export abstract class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}
  async findById(id: Types.ObjectId): Promise<T | null> {
    return this.model.findById(id);
  }
  async findAll(): Promise<T[]> {
    return this.model.find();
  }
  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }
  async findByIdAndUpdate(
    userId: string,
    update: Partial<T>
  ): Promise<T | null> {
    return this.model.findByIdAndUpdate(userId, update, { new: true });
  }
}
