import { Injectable } from '@angular/core';
import {AngularFireList, AngularFireDatabase} from '@angular/fire/database';
import {Recipe} from '../recipe'
import {HttpClient} from '@angular/common/http'
import { AuthServicesService } from './auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private dataUser: any;
  private dbRef: string;
  private recipesList: AngularFireList<Recipe> = null;
  url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  urlId = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  recipe: any;
  constructor(private db: AngularFireDatabase, 
              private http: HttpClient, private auth: AuthServicesService) {
  }
  getRef() {
      this.dbRef = `/recipes/${this.auth.dataUser.uid}/`;
      this.recipesList = this.db.list(this.dbRef);
  }
  getRecipesList() {
    this.getRef();
    return this.recipesList;
  }
  getRecipe(id){
    const ref = this.db.database.ref(`/recipes/${this.auth.dataUser.uid}/`).child(id);
    return ref.once('value');
  }
  createRecipe(recipe: Recipe){
    this.db.database.ref(`/recipes/${this.auth.dataUser.uid}/${recipe.id}`).update(recipe);
  }
  updateRecipe(id: any, recipe: Recipe){
    this.db.database.ref(`/recipes/${this.auth.dataUser.uid}/${id}`).update(recipe);
  }
  deleteRecipe(id: any) {
    this.getRef();
    return this.recipesList.remove(id);
  }
  //API
  getRecipesAPI(search: any){
    return this.http.get(this.url + search);
  }
  getRecipesAPIId(id: any){
    return this.http.get(this.urlId + id);
  }
}
