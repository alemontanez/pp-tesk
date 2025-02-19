import { DataTypes, Model} from 'sequelize'
import { sequelize } from '../config/database.js'

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  },
  can_view: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  can_edit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  can_manage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'roles'
})

export default Role