import express, { Router } from 'express'
import { aloneAdminMiddleware } from '../middleware/auth.middleware'
import tryCatch from '../utils/tryCatch'
import { PATH } from '../config'
import { Product, User } from '../model'
import { ProductService } from '../service'
import { ProductController } from '../controller'
import ROLE from '../utils/roles'

const user = new User()
const product = new Product()

const productService = new ProductService(product)

const productController = new ProductController(productService)

const router = express.Router()

router.get(PATH.product, tryCatch(aloneAdminMiddleware([ROLE.ADMIN]))
  , tryCatch(productController.getAll))

router.post(PATH.product, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])),
  tryCatch(productController.save))

router.get(`${PATH.product}/:id`, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])),
  tryCatch(productController.getById))

router.put(`${PATH.product}/:id`, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])),
  tryCatch(productController.update))

router.delete(`${PATH.product}/:id`, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])),
  tryCatch(productController.delete))

export default router
