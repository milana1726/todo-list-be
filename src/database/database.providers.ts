import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
        Logger.log('✅ Successfully connected to MongoDB', 'MongoDB');
        return connection;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        Logger.error('❌ Connection error:', message, 'MongoDB');
        throw err;
      }
    },
  },
];
