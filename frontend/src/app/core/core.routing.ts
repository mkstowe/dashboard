import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../home-assistant/pages/home-page/home-page.component';
import { MusicPageComponent } from '../music/pages/music-page/music-page.component';
import { RecipePageComponent } from '../recipes/pages/recipe-page/recipe-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    data: { tab: 1 },
    loadChildren: () =>
      import('../home-assistant/home-assistant.module').then(
        (m) => m.HomeAssistantModule
      ),
  },
  {
    path: 'music',
    component: MusicPageComponent,
    data: { tab: 2 },
    loadChildren: () =>
      import('../music/music.module').then((m) => m.MusicModule),
  },
  {
    path: 'recipes',
    component: RecipePageComponent,
    data: { tab: 3 },
    loadChildren: () =>
      import('../recipes/recipes.module').then((m) => m.RecipesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
