import { Injectable } from '@angular/core';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class GetIdService {
  recipes: any[];
  idValue: any;
  constructor(private recipesService: RecipesService) { }
  // Método de búsqueda API
  getRecipe() {
    return this.recipesService.getRecipesAPI(this.idValue).subscribe((data: any) => {
      this.recipes = data.meals;
    });
  }
}
