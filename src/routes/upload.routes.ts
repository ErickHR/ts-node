
import { Request, Response, Router } from 'express'
import tryCatch from '../utils/tryCatch';
import { Product, User } from '../model';
import { UploadService } from '../service';
import { UploadController } from '../controller';
import { exitsParamsFile } from '../utils/validateFile';


const product = new Product()
const user = new User()

const uploadService = new UploadService(product, user)

const uploadController = new UploadController(uploadService)

const router = Router()

router.post('/upload', tryCatch(exitsParamsFile), tryCatch(uploadController.save))

router.post('/:collection/:id', tryCatch(exitsParamsFile), tryCatch(uploadController.saveByCollection))
router.get('/:collection/:id', tryCatch(uploadController.getById))

export default router
