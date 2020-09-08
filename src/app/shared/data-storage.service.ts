import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { environment } from '../../environments/environment';


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
}
