import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
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

  constructor(private recipeService: RecipeService) {
  }

  public ngOnInit(): void {
    this.allRecipes = this.recipeService.recipes;
    // this.recipeService.recipes.subscribe((res: any) => {
    //   this.allRecipes = res;
    // })
    // this.recipes = this.allRecipes.slice(0, this.pageSize);
    // this.recipeService.recipes.subscribe((res: any) => {
      // this.allRecipes = res;
      // this.recipes = res.split(0, this.pageSize);
      // console.log(this.allRecipes)
      // this.numRecipes = this.allRecipes.length;
    // })
    // this.recipeService
    //   .getRecipes()
    //   .pipe(take(1))
    //   .subscribe((res: any) => {
    //     this.allRecipes = res;
    //     this.recipes = this.allRecipes.slice(0, this.pageSize);
    //     this.numRecipes = res.length;
    //     this.numPages = Math.ceil(this.numRecipes / this.pageSize);
    //   });
  }

  public onPage($event: PageEvent) {
    this.page = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;


  }

  public trackRecipe(index: number, recipe: any) {
    return recipe.id;
  }
}
