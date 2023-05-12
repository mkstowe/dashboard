import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, shareReplay, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public $recipes = new BehaviorSubject<any>(null);
  private apiUrl = `${environment.mealieUrl}/api`;

  constructor(private http: HttpClient) {
    this.getAllRecipes();
  }

  public getAllRecipes() {
    return this.http
      .get(`${this.apiUrl}/recipes/summary`)
      .pipe(shareReplay(1), take(1))
      .subscribe((res: any) => {
        this.$recipes.next(res);
      });
  }

  public getRecipe(slug: string) {
    return this.http.get(`${this.apiUrl}/recipes/${slug}`);
  }

  public getRecipeImage(slug: string, fileName: string) {
    return this.http.get(
      `${this.apiUrl}/media/recipes/${slug}/images/${fileName}`
    );
  }
}
