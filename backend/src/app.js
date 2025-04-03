import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import projectUsersRoutes from './routes/project_users.routes.js'
import roleRoutes from './routes/role.routes.js'
import boardRoutes from './routes/board.routes.js'
import labelRoutes from './routes/label.routes.js'
import prioritiesRoutes from './routes/priorities.routes.js'
import taskRoutes from './routes/task.routes.js'
import commentRoutes from './routes/comment.routes.js'
import membershipsRoutes from './routes/memberships.routes.js'
import './models/relationships.js'
import { authRequired } from './middlewares/jwtValidator.middleware.js'
import { FRONTEND_URL } from './config/config.js'

const app = express()

app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.disable('x-powered-by')
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json('API funcionando.')
})

// Rutas públicas
app.use('/api', authRoutes)

// Rutas privadas
app.use('/api', authRequired, userRoutes)
app.use('/api', authRequired, projectRoutes)
app.use('/api', authRequired, projectUsersRoutes)
app.use('/api', authRequired, roleRoutes)
app.use('/api', authRequired, boardRoutes)
app.use('/api', authRequired, labelRoutes)
app.use('/api', authRequired, prioritiesRoutes)
app.use('/api', authRequired, taskRoutes)
app.use('/api', authRequired, commentRoutes)
app.use('/api', authRequired, membershipsRoutes)

export default app