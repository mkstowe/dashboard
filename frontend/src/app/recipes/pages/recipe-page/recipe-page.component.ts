import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { take } from 'rxjs';
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

  constructor(private recipeService: RecipeService) {}

  public ngOnInit(): void {
    this.recipeService
      .getRecipes(this.page, this.pageSize)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.recipes = res?.items;
        this.numRecipes = res?.total;
        this.numPages = res?.total_pages;
      });
  }

  public onPage($event: PageEvent) {
    this.page = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;

    this.recipeService
      .getRecipes(this.page, this.pageSize)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.recipes = res?.items;
      });
  }

  public trackRecipe(index: number, recipe: any) {
    return recipe.id;
  }
}
