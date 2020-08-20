import { Recipe } from "./recipe.model";

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Lasagna', 'The best Lasagna recipe', 'https://images.media-allrecipes.com/userphotos/720x405/3359675.jpg'),
    new Recipe('Cookies', 'The Best Chocolate Chip Cookie recipe', 'https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1-e1549147195343.jpg'),
  ];

  getRecipes(){
    return this.recipes.slice();
  }
}
