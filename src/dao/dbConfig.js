import mongoose from 'mongoose';
import config from '../config/dotenv.config.js';
import logger from '../middlewares/logger.js';

const MONGO_URL = process.env.MONGO_URL;

try {
    await mongoose.connect(MONGO_URL);
    logger.info('*** Conectado a la BDD ***')
} catch (error) {
    logger.error(error);
}