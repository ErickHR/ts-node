
import { Router } from 'express'
import { PATH } from '../config'
import tryCatch from '../utils/tryCatch'
import { AuthController } from '../controller'

const authController = new AuthController()

const router = Router()

router.post(PATH.login, tryCatch(authController.login))

export default router


