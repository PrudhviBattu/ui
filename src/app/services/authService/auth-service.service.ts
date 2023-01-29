import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  API_URL = 'http://localhost:5000/api/user/login';
  API_URL_SIGN_UP = 'http://localhost:5000/api/user';
  public tokenReceived$ = new BehaviorSubject<any>(false);
  constructor(private http: HttpClient, private router: Router) {}

  loggedIn(formData: any) {
    this.http.post(this.API_URL, formData).subscribe((res) => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/home']);
        return this.tokenReceived$.next(true);
      }
    });
  }

  signUp(formData:any) {
    this.http.post(this.API_URL_SIGN_UP, formData).subscribe((res) => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res));
        console.log(res, 'res');
        this.router.navigate(['/home']);
        return this.tokenReceived$.next(true);
      }
    })
  }

  restToken(){
    localStorage.setItem('user', '');
    this.tokenReceived$.next(false);
  }
}
