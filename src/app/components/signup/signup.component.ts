import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!:FormGroup;
  type:string = "password";
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  formData: any;
  constructor(private fb:FormBuilder, private router: Router, private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    const currentUrl = this.router.url;
    if (currentUrl === '/signup') {
      this.authService.restToken();
    }
  }
  onSubmit() {
    this.formData = this.signUpForm.value
    this.authService.signUp(this.formData);
    console.log("signup",this.signUpForm.value)
  }

  hideShow() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';
  }

}
