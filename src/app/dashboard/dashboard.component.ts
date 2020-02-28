import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import {Recipe} from '../recipe';
import { AuthServicesService } from '../services/auth-services.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  recipes: any;
  recipes2: any[];
  show: boolean;
  constructor(private recipesService: RecipesService, private auth: AuthServicesService) {
    this.show = true;
   }

  ngOnInit() {
    this.getRecipesList();
    setTimeout(() => {
      this.show = false;
    }, 1500);
  }
 
  getRecipesList(){
    this.recipesService.getRecipesList().snapshotChanges()
      .subscribe( recipe => {
        this.recipes = [];
        recipe.forEach(element => {
          let x = element.payload.toJSON();
          x['$id'] = element.key;
          this.recipes.push(x as Recipe);
        });
      });
  }
  }

