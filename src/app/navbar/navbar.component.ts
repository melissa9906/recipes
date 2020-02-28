import { Component, OnInit} from '@angular/core';
import { AuthServicesService } from '../services/auth-services.service';
import { Router } from '@angular/router';
import { GetIdService } from '../services/get-id.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthServicesService, private router: Router,
              private value: GetIdService) { }

  ngOnInit() {
  }
  search(value: any) {
    this.value.idValue = value;
    this.value.getRecipe();
    this.router.navigate(['/search']);
  }
  logOut() {
    this.auth.logoutFirebase();
  }

}
