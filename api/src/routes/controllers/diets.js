const { Diet } = require ("../../db")

const dietTypes = async () => {
    try {
      const prediets = await Diet?.findAll();
      if (prediets?.length) {
        return prediets;
      }
      const types = [
        "gluten free",
        "dairy free",
        "ketogenic",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "paleolithic",
        "primal",
        "fodmap friendly",
        "whole 30",
      ];
  
      types.map(async (d) => {
        await Diet.findOrCreate({
          where: { name: d },
        });
      });
      return await Diet?.findAll();
    } catch (error) {
      console.log(error);
    }
  };

  const getDiets = async (req, res) => {
    try {
      const diets = await dietTypes();
      res.send(diets);
    } catch (error) {
      console.log(error);
    }
  }
  
  
module.exports = {getDiets}