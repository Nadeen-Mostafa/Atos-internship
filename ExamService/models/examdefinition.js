'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examDefinition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  examDefinition.init({
    Name: DataTypes.STRING,
    passingScore: DataTypes.NUMBER,
    Questions: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'examDefinition',
  });
  return examDefinition;
};