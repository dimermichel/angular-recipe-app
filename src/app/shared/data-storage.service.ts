import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { RecipeService } from "../recipes/recipe.service";
import { environment } from '../../environments/environment';
import { Recipe } from "../recipes/recipe.model";


@Injectable({providedIn: 'root'})
export class DataStorageService {
  baseUrl: string;
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
                this.baseUrl = environment.BASE_URL;
              }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(`${this.baseUrl}/recipes.json`, recipes)
    .subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes.json`)
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      })
    }), tap((recipes) => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}
