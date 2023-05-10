import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = `${environment.mealieUrl}/api`;

  constructor(private http: HttpClient) { }

  public getAllRecipes() {
    return this.http.get(`${this.apiUrl}/recipes/summary`);
  }

  public getRecipeImage(recipeSlug: string, fileName: string) {
    return this.http.get(`${this.apiUrl}/media/recipes/${recipeSlug}/images/${fileName}`);
  }
}
