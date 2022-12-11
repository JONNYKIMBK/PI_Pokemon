const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "type",
    {
      name_type: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {}
  );
};
