const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id_pokemon: {
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

        const rawNameUpper = rawName.charAt(0).toUpperCase() + rawName.slice(1);
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
    height: {
      type: DataTypes.INTEGER,

      //la altura esta en decimetros y se muestra en centimetros
      get() {
        const heightDm = this.getDataValue("height");

        heightDm = heightDm * 10;

        return heightDm ? `${heightDm} cm` : heightDm;
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      //el peso se pasa como hectogramos por la API y se devuelve en kilogramos
      get() {
        const weightHg = this.getDataValue("weight");

        weightHg = weightHg / 10;

        return weightHg ? `${weightHg} Kg` : weightHg;
      },
    },
    type: {
      type: DataTypes.INTEGER,
    },
  });
};
