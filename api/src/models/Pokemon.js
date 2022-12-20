const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        validate: {
          isAlphanumeric: true,
        },
        //pone la primera letra del nombre en mayuscula
        get() {
          const rawName = this.getDataValue("name");

          const rawNameUpper =
            rawName.charAt(0).toUpperCase() + rawName.slice(1);
          return rawName ? rawNameUpper : null;
        },
      },
      hp: {
        type: DataTypes.INTEGER,
      },
      attack: {
        type: DataTypes.INTEGER,
      },
      defense: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.INTEGER,
      },

      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      type1: {
        type: DataTypes.STRING,
      },
      type2: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
};
