import { Router } from 'express'
import multer from 'multer'
import multerConfig from '../src/config/multer'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import authMiddleware from '../src/app/middlewares/auth'
import CategoryController from './app/controllers/CategoryController'

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)
routes.use(authMiddleware)
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)
export default routes
