import { Routes } from "@angular/router";
import { RecipeDetailComponent } from "./pages/recipe-detail/recipe-detail.component";
import { MusicPageComponent } from "../music/pages/music-page/music-page.component";
import { RecipePageComponent } from "./pages/recipe-page/recipe-page.component";

export const RECIPE_ROUTES: Routes = [
  {
    path: '', component: RecipePageComponent
  },
  {
    path: ':slug',
    component: RecipeDetailComponent
  }
];
