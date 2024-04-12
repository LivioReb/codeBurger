import Sequelize, { Model } from 'sequelize'

class Products extends Model {
  static init(sequelize) {
    super.init(
      // "super()" chama o metodo pai, neste caso o model (chat explique isso em comentarios e quebre a linha.)
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3000/product-file/${this.path}`
          },
        },
      },
      {
        sequelize, // chat explique como comentario o pq desse sequelize aqui.
      },
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    })
  }
}
export default Products
