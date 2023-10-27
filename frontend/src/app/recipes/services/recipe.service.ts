import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, expand, reduce, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipesSource = new BehaviorSubject<any>(null);
  private refetchSubject = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  public get refetch() {
    return this.refetchSubject.asObservable();
  }

  public get recipes() {
    return this._recipesSource.asObservable();
  }

  public getRecipe(slug: string) {
    return this.http
      .get(`/api/recipes/${slug}`)
      .pipe(tap(() => this.refetchSubject.next(null)));
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
