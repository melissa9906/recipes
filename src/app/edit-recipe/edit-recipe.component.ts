import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  recipe: any;
  ingredientes: any[];
  pasos: any[];
  recipeForm: any = {};
  constructor(private router: Router, private route: ActivatedRoute, private recipesService: RecipesService) {     
    }
  // Extracción de URL para obtener ID
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getRecipe(id);
  }
  async getRecipe(search) {
    await this.recipesService.getRecipe(search).then(snap => {
      this.recipe = snap.val();
      this.ingredientes = snap.val().ingredientes;
      this.pasos = snap.val().pasos;
      this.recipeForm = this.recipe;
    });
  }
  // Método de envío de formulario para update
  onSubmit() {
    this.recipesService.updateRecipe(this.recipeForm.id, this.recipeForm);
    this.router.navigate(['/recipe/' + this.recipeForm.id]);
  }

}
