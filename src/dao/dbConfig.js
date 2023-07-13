import mongoose from 'mongoose';
import config from '../config/dotenv.config.js';

const MONGO_URL = config.mongoUrl;

try {
    await mongoose.connect(MONGO_URL);
    // await mongoose.connect('mongodb+srv://maximojhernandezla:Iru151220@cluster0mh.tlhs7mz.mongodb.net/newecommerce?retryWrites=true&w=majority')
    // console.log('***Conectado a la BDD***');
} catch (error) {
    console.log(error);
}