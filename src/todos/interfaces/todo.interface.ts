import { Types } from 'mongoose';

export interface Todo {
  readonly message: string;
  readonly completed?: boolean;
  readonly id: string | Types.ObjectId;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
