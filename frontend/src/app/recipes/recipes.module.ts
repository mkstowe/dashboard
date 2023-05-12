import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { RouterModule } from '@angular/router';
import { RECIPE_ROUTES } from './recipes.routing';
import { RecipeService } from './services/recipe.service';

@NgModule({
  declarations: [
    RecipeCardComponent,
    RecipePageComponent,
    RecipeDetailComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(RECIPE_ROUTES)],
  exports: [RecipePageComponent],
})
export class RecipesModule {}
