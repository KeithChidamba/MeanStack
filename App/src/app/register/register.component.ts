
import { Component,OnInit } from '@angular/core';
import { Validators,FormBuilder,FormGroup,AbstractControl,Validator } from "@angular/forms";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  checkingValidity =false;
  PasswordsMatch= false;

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
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
      ])],
      confirm: ['', Validators.compose([
        Validators.required
      ])]
    });
    //submit the form
    onRegisterSubmit(){
      if(this.SignUpform.valid && this.PasswordsMatch)
        alert('submitted');
    }
    //event for validating fields before submition
    checkValidity(){
      if(!this.SignUpform.valid || !this.PasswordsMatch){
          alert("please correct form before submitting");
      }
     this.checkingValidity = true;
     if(this.SignUpform.controls.password.value === this.SignUpform.controls.confirm.value) {
        this.PasswordsMatch =true;
     
     } 
    }

}

