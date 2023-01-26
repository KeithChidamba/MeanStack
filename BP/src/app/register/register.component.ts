import { Component,OnInit } from '@angular/core';
import { Validators,FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  checkingValidity =false;
  submitted = false;
  redirect = '/register'
    constructor(private fb: FormBuilder) { 

    } 
    SignUpform = this.fb.group({
      username : ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ])],
      email : ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.required,
        Validators.email
      ])],
      password : ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.required
      ])]
    });
    //submit the form
    //event for validating fields before submition
    checkValidity(){
        this.checkingValidity = true;
      if(this.SignUpform.valid){
        this.submitted = true;
        this.redirect = '/dashboard'
      }
    }
}
