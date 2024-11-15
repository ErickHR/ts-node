
import { Router } from 'express'
import { PATH } from '../config'
import { aloneAdminMiddleware } from '../middleware/auth.middleware'
import tryCatch from '../utils/tryCatch'
import ROLE from '../utils/roles'
import { Category } from '../model'
import { CategoryService } from '../service'
import { CategoryController } from '../controller'

const category = new Category()

const categoryService = new CategoryService(category)

const categoryController = new CategoryController(categoryService)

const router = Router()

router.get(PATH.category, tryCatch(aloneAdminMiddleware([ROLE.ADMIN]))
  , tryCatch(categoryController.getAll))

router.post(PATH.category, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])),
  tryCatch(categoryController.save))

router.get(`${PATH.category}/:id`, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])),
  tryCatch(categoryController.save))

router.put(`${PATH.category}/:id`, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])),
  tryCatch(categoryController.update))

router.delete(`${PATH.category}/:id`, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])),
  tryCatch(categoryController.delete))

export default router


