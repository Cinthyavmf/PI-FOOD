interface Recipe {
  id: number;
  name: string;
  image: string;
  diet: string[];
}

interface Diet {
    id: string;
    name: string;
}

interface RootState {
  showRecipes: Recipe[];
  diets: Diet[];
}
