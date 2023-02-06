import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Validators,FormBuilder } from "@angular/forms";
import { response } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class RegisterComponent {
  checkingValidity =false;
  user:any; 
  submitted = false;
  redirect = '/register'
    constructor(private fb: FormBuilder,public auth:AuthService) { 

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
        Validators.pattern(/^[a-zA-Z0-9]+$/),
        Validators.maxLength(30),
        Validators.required
      ])]
    });
    //submit the form
    //event for validating fields before submition
    checkValidity(){
      this.checkingValidity = true;
      if(this.SignUpform.valid){
        //send info to backend
     // const userInfo = new Observable((observer)=>{

          this.user = {
          email: this.SignUpform.get('email')?.value,
          password:this.SignUpform.get('password')?.value,
          username: this.SignUpform.get('username')?.value
        }

          this.auth.register(this.user).subscribe(response=>{
          // console.log(response.json());
               this.submitted = true;
               this.redirect = '/dashboard'
      })
      }



    }
    
}
