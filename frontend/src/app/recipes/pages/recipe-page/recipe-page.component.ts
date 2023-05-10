import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipePageComponent implements OnInit {
  public recipes: any[];
  public pageSize = 10;
  public pageSizeOptions = [5, 10, 25, 50, 100];
  public pageIndex = 0;
  public numRecipes: number;

  private allRecipes: any[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((res: any) => {
      this.allRecipes = res;
      this.numRecipes = this.allRecipes.length;
      this.recipes = this.allRecipes.slice(0, this.pageSize);
    });
  }

  public trackRecipe(index: number, recipe: any) {
    return recipe.id;
  }

  public onPage($event: any) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.recipes = this.allRecipes.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }
}
