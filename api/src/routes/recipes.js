const axios = require("axios");
const { Router } = require("express");

const {getRecipes, getRecipesId, postRecipe} = require("./controllers/recipes")

const router = Router(); 

router.get("/", getRecipes);
router.get("/:id", getRecipesId);
router.post("/", postRecipe);
  
 
module.exports = router;