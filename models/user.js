'use strict';
const { Model } = require('sequelize');
const { generateHash } = require('../middlewares/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Member)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  },{
    hooks: {
      beforeCreate: user => {
        user.password = generateHash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};