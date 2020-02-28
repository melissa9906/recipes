import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServicesService } from '../services/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any = {};
  claseBootstrap: string;
  message: string;
  constructor(protected authService: AuthServicesService, private fb: FormBuilder, private router: Router) {

   }
  ngOnInit() {
    setTimeout(() => {
      if (this.authService.isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
    }, 500);
  }
  onSubmit() {
    console.log(this.data);
    this.message = 'Trying to validate';
    this.claseBootstrap = 'alert alert-success';
    this.authService.loginFirebase(this.data.email, this.data.password);
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

}
