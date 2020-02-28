import { Component, OnInit} from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { GetIdService } from '../services/get-id.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  show: boolean;
  constructor(protected value: GetIdService) {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 1500);
   }
  // Extracción de URL para búsqueda
  ngOnInit() {
  }

}
