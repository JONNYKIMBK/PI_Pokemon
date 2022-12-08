const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("type", {
    id_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      initialAutoIncrement: 21,
    },
    name_type: {
      type: DataTypes.STRING,
      unique: true,

      validate: {
        isAlphanumeric: true,
      },
    },
  });
};
