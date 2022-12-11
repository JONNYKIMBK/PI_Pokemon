const axios = require("axios");

const { Type } = require("../db");

const types = async () => {
  const promiseTypes = [];

  await axios.get("https://pokeapi.co/api/v2/type").then((response) => {
    const { results } = response.data;

    promiseTypes.push(
      results.map(({ name }) => {
        return name;
      })
    );
  });

  for (let i = 0; i < promiseTypes[0].length; i++) {
    await Type.findOrCreate({
      where: {
        name_type: promiseTypes[0][i],
      },
    });
  }

  console.log("hola");
  return promiseTypes[0];
};

module.exports = {
  types,
};
