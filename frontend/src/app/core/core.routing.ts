import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../home-assistant/pages/home-page/home-page.component';
import { MusicPageComponent } from '../music/pages/music-page/music-page.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomePageComponent,
    data: { tab: 1 },
    loadChildren: () =>
      import('../home-assistant/home-assistant.module').then(
        (m) => m.HomeAssistantModule
      ),
  },
  {
    path: 'music',
    canActivate: [AuthGuard],
    component: MusicPageComponent,
    data: { tab: 2 },
    loadChildren: () =>
      import('../music/music.module').then((m) => m.MusicModule),
  },
  {
    path: 'recipes',
    canActivate: [AuthGuard],
    data: { tab: 3 },
    loadChildren: () =>
      import('../recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'plants',
    canActivate: [AuthGuard],
    data: { tab: 4 },
    loadChildren: () =>
      import('../plants/plants.module').then((m) => m.PlantsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
