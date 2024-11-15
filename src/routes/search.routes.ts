
import { Router } from 'express'
import { PATH } from '../config'
import tryCatch from '../utils/tryCatch'
import { aloneAdminMiddleware } from '../middleware/auth.middleware'
import ROLE from '../utils/roles'
import { Category, Product } from '../model'
import SearchService from '../service/search.service'
import { SearchController } from '../controller'

const category = new Category()
const product = new Product()
const searchService = new SearchService(product, category)
const searchController = new SearchController(searchService)

const router = Router()

router.get(`${PATH.search}/:coleccion/:search`, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])),
  tryCatch(searchController.getAll))

export default router


