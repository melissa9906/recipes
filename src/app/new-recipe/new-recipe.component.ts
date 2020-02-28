import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  date = Date.now().toString();
  ingredientes: any[20] = [];
  pasos: any[1] = [];
  recipeForm;
  recipe: Recipe;
  constructor(private fb: FormBuilder, private recipesService: RecipesService, private router: Router) {
    // Llenado de arreglos para Form"
    for (let index = 0; index < 20; index++) {
      this.ingredientes[index] = '';
    }
    this.pasos[0] = '';
    // Creación del Form
    this.recipeForm = this.fb.group({
      id: [this.date, Validators.required],
      imagen: [''],
      ingredientes: this.fb.group({
        0: [''],
        1: [''],
        2: [''],
        3: [''],
        4: [''],
        5: [''],
        6: [''],
        7: [''],
        8: [''],
        9: [''],
        10: [''],
        11: [''],
        12: [''],
        13: [''],
        14: [''],
        15: [''],
        16: [''],
        17: [''],
        18: [''],
        19: [''],
        20: ['']
      }),
      pasos: this.fb.group({
        0: ['']
      }),
      source: [''],
      tipo: [''],
      titulo: [''],
      dificultad: [''],
      tipoComida: [''],
      porciones: ['']
    })
  }

  ngOnInit() {
  }
  onSubmit(data){
    // Creación de objeto Recipe para añadir a Firebase
    this.recipe = {
      id: data.id,
      pasos: [
        data.pasos[0]
      ],
      ingredientes: [
        data.ingredientes[0],
        data.ingredientes[1],
        data.ingredientes[2],
        data.ingredientes[3],
        data.ingredientes[4],
        data.ingredientes[5],
        data.ingredientes[6],
        data.ingredientes[7],
        data.ingredientes[8],
        data.ingredientes[9],
        data.ingredientes[10],
        data.ingredientes[11],
        data.ingredientes[12],
        data.ingredientes[13],
        data.ingredientes[14],
        data.ingredientes[15],
        data.ingredientes[16],
        data.ingredientes[17],
        data.ingredientes[18],
        data.ingredientes[19],
        data.ingredientes[20],
      ],
      titulo: data.titulo,
      tipo: data.tipo,
      imagen: data.imagen,
      source: data.source,
      dificultad: data.dificultad,
      tipoComida: data.tipoComida,
      porciones: data.porciones
    }
    this.recipesService.createRecipe(this.recipe);
    this.router.navigate(['/recipe/' + this.recipe.id]);
  }

}
