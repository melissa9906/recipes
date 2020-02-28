import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: any;
  ingredientes: any[];
  pasos: any[];
  show: boolean;
  constructor(private router: Router, private route: ActivatedRoute, private recipesService: RecipesService,
    private el: ElementRef) {
      this.show = true;
      const id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      setTimeout(() => {
      this.getRecipe(id);
      this.show = false;
      }, 2000);
  }

  @HostListener('click', ['$event'])
  ngOnInit() {}
  async getRecipe(search) {
    await this.recipesService.getRecipe(search).then(snap => {
      this.recipe = snap.val();
      this.ingredientes = snap.val().ingredientes;
      this.pasos = snap.val().pasos;
    });
  }
  clicked(event: Event) {
    const url = this.el.nativeElement.href;
    this.router.navigate(['/externalRedirect', { externalUrl: url }], {
      skipLocationChange: true,
    });
    event.preventDefault();
  }
  deleteRecipe(id) {
    this.recipesService.deleteRecipe(id);
    this.router.navigate(['/dashboard']);
  }
}
