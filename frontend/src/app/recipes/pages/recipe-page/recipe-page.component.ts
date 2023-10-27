import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Observable, switchMap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipePageComponent implements OnInit {
  public numPages: number;
  public numRecipes: number;
  public page = 1;
  public pageSize = 25;
  public pageSizeOptions = [5, 10, 25, 50, 100];
  public recipes: any[];
  public allRecipes: Observable<any[]>;

  constructor(private recipeService: RecipeService) {}

  public ngOnInit(): void {
    this.allRecipes = this.recipeService.refetch.pipe(
      switchMap(() => {
        return this.recipeService.getRecipes();
      })
    ) as Observable<any[]>;
  }

  public onPage($event: PageEvent) {
    this.page = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
  }

  public trackRecipe(index: number, recipe: any) {
    return recipe.id;
  }
}
