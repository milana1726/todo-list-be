import * as mongoose from 'mongoose';
import { CustomLoggerService } from 'src/logger/custom-logger.service';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      logger: CustomLoggerService,
    ): Promise<typeof mongoose> => {
      try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
        logger.log('[MongoDB] ✅ Successfully connected to MongoDB');
        return connection;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        logger.error('[MongoDB] ❌ Connection error:', message);
        throw err;
      }
    },
    inject: [CustomLoggerService],
  },
];
