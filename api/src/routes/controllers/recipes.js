require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios");
const { Recipe, Diet } = require("../../db");


// GET /recipes?name="..."

const apiRecipes = async () => {
  try {
    const json = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const recipe = json.data.results?.map((r) => {
      return {
        id: r.id,
        image: r.image,
        name: r.title,
        diet: r.diets,
        score: r.spoonacularScore,
        summary: r.summary,
        //instructions: r.analyzedInstructions[0]?.steps.map((s) => s.number + ". " + s.step),
        time: r.readyInMinutes,
        healthScore: r.healthScore
      };
    });
    //console.log(recipe);
    return recipe;
  } catch (error) {
    console.log(error);
  }
};

const dbRecipes = async () => {
  try {
    const db = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const findRecipe = db.map((n) => ({
      id: n.id,
      image: n.image,
      name: n.name,
      diet: n.diets.map((d) => d.name),
      score: n.score,
      summary: n.summary,
      instructions: n.instructions,
      // createdByUser: n.createdByUser,
      healthScore: n.healthScore
    }));
    return findRecipe;
  } catch (error) {
    console.log(error);
  }
};

const allRecipes = async () => {
  try {
    const api = await apiRecipes();
    const db = await dbRecipes();
    const all = [...api, ...db];
    return all;
  } catch (error) {
    console.log(error);
  }
};

const apiName = async (name) => {
  try {
    return await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      )
      .then((res) => {
        const names = res.data.results.map((r) => {
          return {
            id: r.id,
            image: r.image,
            name: r.title,
            diet: r.diets,
            instructions: r.instructions,
            summary: r.summary,
            healthScore: r.healthScore
          };
        });
        return names.filter((n) =>
          n.name.toLowerCase().includes(name.toLowerCase())
        );
      });
  } catch (error) {
    console.log(error);
  }
};

const dbName = async (name) => {
  try {
    const names = await Recipe.findAll({
      where: { name: { [Op.iLike]: "%" + name + "%" } },
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const dbNames = names.map((n) => ({
      id: n.id,
      image: n.image,
      name: n.name,
      diet: n.diets.map((d) => d.name),
      score: n.score,
      summary: n.summary,
      instructions: n.instructions,
      // createdByUser: n.createdByUser,
      healthScore: n.healthScore
    }));
    return dbNames;
  } catch (error) {
    console.log(error);
  }
};

const allNames = async (name) => {
  try {
    const api = await apiName(name);
    const db = await dbName(name);
    const all = api.concat(db);
    return all;
  } catch (error) {
    console.log(error);
  }
};

const getRecipes = async (req, res) => {
    const { name } = req.query;
    try {
      const totalRecipes = await allRecipes();
      if (!name) {
        return res.send(totalRecipes);
      } else if (name) {
        const totalNames = await allNames(name);
        return res.send(totalNames);
      } else {
        return res.status(404).json({ msg: "Recipe Not Found" });
      }
    } catch (error) {
      console.log(error);
    }
  }


const apiId = async (id) => {
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const detail = api.data;
   // console.log(detail)
    return {
      id: id,
      image: detail.image,
      name: detail.title,
      diet: detail.diets,
      summary: detail.summary,
      score: detail.spoonacularScore,
      healthScore: detail.healthScore,
      instructions: detail.analyzedInstructions[0]?.steps.map((s) => s.number + ". " + s.step),
    };

  } catch (error) {
    console.log(error);
  }
};

const dbId = async (id) => {
  try {
    const idDb = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return {
      id: id,
      image: idDb.image,
      name: idDb.name,
      score: idDb.score,
      summary: idDb.summary,
      healthScore: idDb.healthScore,
      instructions: idDb.instructions,
      // createdByUser: idDb.createdByUser,
      diet: idDb.diets.map((d) => d.name),
    };
  } catch (error) {
    console.log(error);
  }
};

const allIds = async (id) => {
  // console.log("manzana", id);
  try {
    if (id.includes("-")) {
      const db = await dbId(id);
      return db;
    }
    const api = await apiId(id);
    return api;
  } catch (error) {
    console.log(error);
  }
};

const getRecipesId = async (req, res) => {
    try {
      const { id } = req.params;
      const ids = await allIds(id);
      if (ids) {
        return res.send(ids);
      } else {
        return res.status(404).json({ msg: "ID Not Found" });
      }
    } catch (error) {
      console.log(error);
    }
  }

const postRecipe = async (req, res) => {
    try {
      const {
        name,
        image,
        summary,
        healthScore,
        instructions,
        diets,
        // createdByUser,
      } = req.body;
      const newRecipe = await Recipe.create({
        name,
        image:
          image ||
          "https://p4.wallpaperbetter.com/wallpaper/314/740/853/vegetables-fork-spoon-plate-wallpaper-preview.jpg",
        summary,
        healthScore,
        instructions: [...instructions],
        // createdByUser,
      });
      const diet = await Diet.findAll({
        where: { name: diets },
      });
  
      newRecipe.addDiet(diet);
  
      // return res.status(200).send("Recipe created succesfully!");
      return res.send(newRecipe);
    } catch (error) {
      console.log(error);
    }
  }


module.exports = {getRecipes, getRecipesId, postRecipe};