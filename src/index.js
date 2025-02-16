import app from './app.js'
import { sequelize } from './config/database.js'
import { PORT } from './config/config.js'

const main = async () => {
  try {
    await sequelize.sync()
    console.log('Connection to database has been established successfully')
    app.listen(PORT)
    console.log('Server running on port:', PORT)
  } catch (error) {
    console.log('Failed to start server', error)
  }
}

main()