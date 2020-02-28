import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-api',
  templateUrl: './recipe-api.component.html',
  styleUrls: ['./recipe-api.component.css']
})
export class RecipeAPIComponent implements OnInit {
  recipes: any[];
  ingredients: any[];
  recipe: any;
  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) {
    let search = '';
    search = this.route.snapshot.paramMap.get('id');
    this.getRecipe(search);
   }
  // Extracción de URL para búsqueda
  ngOnInit() {
    
  }
  // Método de búsqueda en API
  async getRecipe(search){
    await this.recipesService.getRecipesAPIId(search).subscribe((data: any) => {
      this.recipes = data.meals;
      console.log(this.recipes);
    });  
  }
  addRecipe(recipe){
    // Creación de objeto Recipe para añadir a Firebase
    let recipeToAdd: Recipe;
    recipeToAdd = {
      id: recipe.idMeal,
      pasos: [recipe.strInstructions],
      ingredientes: [
        recipe.strIngredient1 + ' ' + recipe.strMeasure1,
        recipe.strIngredient2 + ' ' + recipe.strMeasure2,
        recipe.strIngredient3 + ' ' + recipe.strMeasure3,
        recipe.strIngredient4 + ' ' + recipe.strMeasure4,
        recipe.strIngredient5 + ' ' + recipe.strMeasure5,
        recipe.strIngredient6 + ' ' + recipe.strMeasure6,
        recipe.strIngredient7 + ' ' + recipe.strMeasure7,
        recipe.strIngredient8 + ' ' + recipe.strMeasure8,
        recipe.strIngredient9 + ' ' + recipe.strMeasure9,
        recipe.strIngredient10 + ' ' + recipe.strMeasure10,
        recipe.strIngredient11 + ' ' + recipe.strMeasure11,
        recipe.strIngredient12 + ' ' + recipe.strMeasure12,
        recipe.strIngredient13 + ' ' + recipe.strMeasure13,
        recipe.strIngredient14 + ' ' + recipe.strMeasure14,
        recipe.strIngredient15 + ' ' + recipe.strMeasure15,
        recipe.strIngredient16 + ' ' + recipe.strMeasure16,
        recipe.strIngredient17 + ' ' + recipe.strMeasure17,
        recipe.strIngredient18 + ' ' + recipe.strMeasure18,
        recipe.strIngredient19 + ' ' + recipe.strMeasure19,
        recipe.strIngredient20 + ' ' + recipe.strMeasure20
      ],
      titulo: recipe.strMeal,
      tipo: recipe.strCategory,
      imagen: recipe.strMealThumb,
      source: recipe.strSource,
      dificultad: 'n/a',
      tipoComida: 'n/a',
      porciones:  'n/a'
    }
    console.log(recipeToAdd);
    this.recipesService.createRecipe(recipeToAdd);
    this.router.navigate(['/dashboard']);
  }
}
