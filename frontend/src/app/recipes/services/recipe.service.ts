import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private headers = {
    Authorization: `Bearer ${environment.mealieAccessToken}`,
  };

  constructor(private http: HttpClient) {}

  public getRecipe(slug: string) {
    return this.http.get(`/api/mealie/recipes/${slug}`, {
      headers: this.headers,
    });
  }

  public getRecipes(page: number, perPage: number) {
    return this.http.get(
      `/api/mealie/recipes?page=${page}&perPage=${perPage}`,
      {
        headers: this.headers,
      }
    );
  }
}
