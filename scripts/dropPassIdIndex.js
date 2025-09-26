import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function dropPassIdIndex() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('registeredattends');

    // Check if index exists
    const indexes = await collection.indexes();
    const passIdIndex = indexes.find(index => index.name === 'passId_1');

    if (passIdIndex) {
      await collection.dropIndex('passId_1');
      console.log('Successfully dropped passId_1 index');
    } else {
      console.log('passId_1 index does not exist');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

dropPassIdIndex();