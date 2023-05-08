import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RecipeCardComponent, RecipePageComponent],
  imports: [CommonModule, SharedModule],
  exports: [RecipePageComponent],
})
export class RecipesModule {}
