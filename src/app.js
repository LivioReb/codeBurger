import express from 'express'
import routes from './routes.js'
import { resolve } from 'path'
import cors from 'cors'
import './database'

const corsOptions = {
  origin: 'http://code-burger-frontend-livio-dev.vercel.app',
  credentials: true,
  optionsSuccessStatus: 200 // alguns navegadores antigos (IE11, vários SmartTVs) requerem isso
}

class App {
  constructor() {
    this.app = express()
    
    // Adiciona um log para verificar as solicitações de CORS
    this.app.use((req, res, next) => {
      console.log(`Received request from origin: ${req.headers.origin}`)
      next()
    })

    // Aplica as opções de CORS
    this.app.use(cors(corsOptions))

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
