import Sequelize from 'sequelize';
import User from '../app/models/User.js';
import Products from '../app/models/Product.js';
import Category from '../app/models/Category.js';
import mongoose from 'mongoose';

const models = [User, Products, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(process.env.DATABASE_URL || 'postgresql://postgres:zaBvVrtRDTnOMUnyCxJjoLcCQmNBdIsj@roundhouse.proxy.rlwy.net:23029/railway', {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: console.log // Adicionado para logs de Sequelize
    });

    this.connection.authenticate()
      .then(() => {
        console.log('Connection to PostgreSQL has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to PostgreSQL:', err);
      });

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    const mongoURI = process.env.MONGO_URL || 'mongodb://mongo:BtOUesdJjTyIpPCqXPiuvmTmvMsyVuuR@viaduct.proxy.rlwy.net:46264';

    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB', error);
    });

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });
  }
}

export default new Database();
