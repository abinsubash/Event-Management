import { Model, Types } from "mongoose";

export abstract class BaseRepository<T extends Document>{
    constructor(protected model:Model<T>){}
    async findById(id:Types.ObjectId):Promise<T|null>{
        return this.model.findById(id)
    }
    async findAll():Promise<T[]>{
        return this.model.find()
    }
}