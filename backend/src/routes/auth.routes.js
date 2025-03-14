import { Router } from 'express'
import { login, logout, register } from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/schemaValidator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)

export default router