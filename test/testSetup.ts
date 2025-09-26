import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app';

let mongoServer: MongoMemoryServer | null = null;

export const startTestDb = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const stopTestDb = async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
};

export default app;
