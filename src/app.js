import express from 'express'
import routes from './routes.js'
import { resolve } from 'path'
import './database'

class App {
  constructor() {
    this.app = express()
    
    // Middleware para permitir CORS para um único domínio
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'https://code-burger-frontend-qsdo.vercel.app/')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      res.setHeader('Access-Control-Allow-Credentials', true)
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
      }
      next()
    })

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )

    this.app.use(
      '/category-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app
