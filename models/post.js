'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init({
    title: DataTypes.STRING,
    slug_key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: DataTypes.STRING,
    image_url: DataTypes.STRING,
    categoryId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};