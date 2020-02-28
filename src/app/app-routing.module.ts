import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeComponent } from './recipe/recipe.component';
import { SearchComponent } from './search/search.component';
import { RecipeAPIComponent } from './recipe-api/recipe-api.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { UserGuard } from './user.guard';
import { LoginGuard } from './login.guard';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'crear',
    component: CrearCuentaComponent
  },
  {
    path: 'dashboard',
    canActivate:[UserGuard],
    component: DashboardComponent
  },
  {
    path: 'recipe/:id',
    canActivate:[UserGuard],
    component: RecipeComponent
  },
  {
    path: 'search',
    canActivate:[UserGuard],
    component: SearchComponent
  },
  {
    path: 'recipeA/:id',
    canActivate:[UserGuard],
    component: RecipeAPIComponent
  },
  {
    path: 'editRecipe/:id',
    canActivate:[UserGuard],
    component: EditRecipeComponent
  },
  {
    path: 'newRecipe',
    canActivate:[UserGuard],
    component: NewRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
        provide: externalUrlProvider,
        useValue: (route: ActivatedRouteSnapshot) => {
            const externalUrl = route.paramMap.get('externalUrl');
            window.open(externalUrl, '_self');
        },
    },
]
  
})
export class AppRoutingModule { }
