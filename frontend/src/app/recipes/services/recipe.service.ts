import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, expand, reduce } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipesSource = new BehaviorSubject<any>(null);

  private headers = {
    Authorization: `Bearer ${environment.mealieAccessToken}`,
  };

  constructor(private http: HttpClient) {
    this.getRecipes().subscribe((res) => {
      this._recipesSource.next(res);
    });
  }

  public get recipes() {
    return this._recipesSource.asObservable();
  }

  public getRecipe(slug: string) {
    return this.http.get(`/api/recipes/${slug}`);
  }

  public getRecipes() {
    return this.http
      .get(`/api/recipes?orderBy=name&orderDirection=asc&perPage=50`)
      .pipe(
        expand((res: any) => {
          return res.next ? this.http.get(`/api${res.next}`) : EMPTY;
        }),
        reduce((acc, curr: any) => acc.concat(curr.items), [])
      );
  }
}
