
import { Router } from 'express'
import { PATH } from '../config'
import tryCatch from '../utils/tryCatch'
import { aloneAdminMiddleware } from '../middleware/auth.middleware'
import ROLE from '../utils/roles'
import { User } from '../model'
import { UserService } from '../service'
import { UserController } from '../controller'

const user = new User()

const userService = new UserService(user)

const userController = new UserController(userService)

const router = Router()

router.post(PATH.user, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])), tryCatch(userController.save))
router.get(PATH.user, tryCatch(aloneAdminMiddleware([ROLE.ADMIN])), tryCatch(userController.getAll))

export default router


