import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeDetailComponent implements OnInit {
  public imageUrl: string;
  public recipe: any;
  public slug: string;
  public isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
    });

    this.recipeService.getRecipe(this.slug).subscribe((res) => {
      this.recipe = res;
      this.imageUrl = `${environment.mealieUrl}/api/media/recipes/${this.recipe.id}/images/min-original.webp`;
      this.isLoading = false;
    });
  }
}
