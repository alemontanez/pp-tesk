import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'

class Label extends Model {}

Label.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  color: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Label',
  tableName: 'labels',
})

export default Label