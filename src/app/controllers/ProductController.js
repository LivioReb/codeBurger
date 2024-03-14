import * as Yup from 'yup'
import Product from '../models/Products'

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.erros }) // nao ta retornando o erro especifico!!
    }
    // essas duas consts tem que está depois da validacao do yup
    const { filename: path } = request.file // explique em comentario pq a gente fez isso. quebre o comentario
    const { name, price, category } = request.body

    const product = await Product.create({
      name,
      price,
      category,
      path,
    })

    return response.json(product)
  }

  async index(request, response) {
    // esse const quer dizer o seguinte, eu vou la no meu banco de dados e vou procurar todos os products
    const products = await Product.findAll()
    return response.json(products)
  }
}

export default new ProductController()
