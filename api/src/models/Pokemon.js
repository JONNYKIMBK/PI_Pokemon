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
        //pone todo en minusculas
        get() {
          const rawName = this.getDataValue("name");

          const rawNameLower = rawName.toLowerCase();
          return rawName ? rawNameLower : null;
        },
      },
      img: {
        type: DataTypes.STRING,
        defaultValue:
          "https://www.pngitem.com/pimgs/m/30-302283_pikachu-pokmon-go-silhouette-drawing-whos-that-pokemon.png",
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
