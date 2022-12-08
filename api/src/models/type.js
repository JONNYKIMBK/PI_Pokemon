const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("type", {
    id_type: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    name_type: {
      type: DataTypes.STRING,
    },
  });
};
