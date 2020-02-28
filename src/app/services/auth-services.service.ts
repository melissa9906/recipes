import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  // Atributos
  data: any;
  dataUser: any;
  auth: boolean;
  response: any;
  user: any;
  isLoggedIn: boolean;
  redirectUrl: string;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.cargarData();
      } else {
        localStorage.setItem('user', null);
        this.isLoggedIn = false;
      }
    });
  }
  // obtiene los datos del localStorage en caso de que exista un registro persistente en el cache del navegador
  cargarData() {
    this.data = localStorage.getItem('user');
    this.dataUser = JSON.parse(this.data);
  }
  // Método genérico para iniciar sesión con servicios
  async loginWithInstance(instance) {
    try {
      await this.afAuth.auth.signInWithPopup(instance);
      this.router.navigate(['/dashboard']);
    } catch (error) {
    }
  }
  loginWithFacebook() {
      let provider = new auth.FacebookAuthProvider();
      this.loginWithInstance(provider);
  }
  loginWithTwitter() {
      let provider = new auth.TwitterAuthProvider();
      this.loginWithInstance(provider);
  }
  loginWithGoogle() {
      let provider = new auth.GoogleAuthProvider();
      this.loginWithInstance(provider);
  }
  loginWithGitHub() {
      let provider = new auth.GithubAuthProvider();
      this.loginWithInstance(provider);
  }
  // Inicio de sesión con Correo y Contraseña
  async loginFirebase(email: string, pass: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, pass).then((res) => {
        this.dataUser = res.user;
        console.log(res);
      }).finally(() => {
        this.isLoggedIn = true;
      });
      this.router.navigate(['/dashboard']);
    } catch (error) {
      alert(error.message);
    }
  }
  async signUpFirebase(email: string, pass: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
    } catch (error) {
      alert(error.message);
    }
  }
  async logoutFirebase() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
