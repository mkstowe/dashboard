import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, expand, reduce } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private _recipesSource = new BehaviorSubject<any>(null);

  private headers = {
    Authorization: `Bearer ${environment.mealieAccessToken}`,
  };

  constructor(private http: HttpClient) {
    this.getRecipes().subscribe((res) => {
      this._recipesSource.next(res)
    });
  }

  public get recipes() {
    return this._recipesSource.asObservable();
  }

  public getRecipe(slug: string) {
    return this.http.get(`/api/mealie/recipes/${slug}`, {
      headers: this.headers,
    });
  }

  public getRecipes() {
    return this.http
      .get(`/api/mealie/recipes?orderBy=name&orderDirection=asc`, {
        headers: this.headers,
      })
      .pipe(
        expand((res: any) => {
          return res.next
            ? this.http.get(`/api/mealie/${res.next}`, {
                headers: this.headers,
              })
            : EMPTY;
        }),
        reduce((acc, curr: any) => acc.concat(curr.items), [])
      );
  }
}
