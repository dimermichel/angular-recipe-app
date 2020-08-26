import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Lasagna',
      'The best Lasagna recipe',
      'https://images.media-allrecipes.com/userphotos/720x405/3359675.jpg',
      [
        new Ingredient('Pasta', 3),
        new Ingredient('Meat', 1),
        new Ingredient('Tomatoes', 4),
      ]),

    new Recipe(
      'Cookies',
      'The Best Chocolate Chip Cookie recipe',
      'https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1-e1549147195343.jpg',
      [
        new Ingredient('Chocolate', 5),
        new Ingredient('Milk', 1),
        new Ingredient('Eggs', 3),
        new Ingredient('Wheat Flour', 1),
      ]),
  ];

  constructor(private shoppingListService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
