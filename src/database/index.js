import Sequelize from 'sequelize'
import configDatabase from '../config/database.js'
import User from '../app/models/User'
import Products from '../app/models/Product.js'
import Category from '../app/models/Category.js'
import mongoose from 'mongoose'
const models = [User, Products, Category]
class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoCOnnection = mongoose.connect(
      'mongodb://localhost:27017/codeburger',
    )
  }
}
export default new Database()
