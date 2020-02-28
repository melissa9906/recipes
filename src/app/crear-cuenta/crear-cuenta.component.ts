import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../services/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  data: any = {};
  constructor(private auht: AuthServicesService, private router: Router) { }
  ngOnInit() {
  }
  onSubmit() {
    this.auht.signUpFirebase(this.data.email, this.data.password);
    this.router.navigate(['/login']);
  }
}
