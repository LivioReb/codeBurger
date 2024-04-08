import Sequelize, { Model } from 'sequelize'

class Products extends Model {
  static init(sequelize) {
    super.init(
      // "super()" chama o metodo pai, neste caso o model (chat explique isso em comentarios e quebre a linha.)
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        category: Sequelize.STRING,
        path: Sequelize.STRING,
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
  }
}
export default Products
