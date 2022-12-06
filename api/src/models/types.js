const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("type", {
    id_type: {
      type: DataTypes.INTEGER,
    },
    name_type: {
      type: DataTypes.STRING,
    },
  });
};
