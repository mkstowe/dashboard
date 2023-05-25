import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeDetailComponent implements OnInit {
  slug: string;
  public recipe: any;
  public imageUrl: string;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
    });

    this.recipeService.getRecipe(this.slug).subscribe((res) => {
      this.recipe = res;
      this.imageUrl = `/api/mealie/media/recipes/${this.recipe.id}/images/min-original.webp`;
    });
  }
}
