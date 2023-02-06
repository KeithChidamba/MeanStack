import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest } from "@angular/common/http";
import { request, response } from 'express';
import { map,OperatorFunction } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  domain = "http://localhost:3000";
  constructor(
    public http:HttpClient
    

    ) { }

    register(user:any) {
          return this.http.post(this.domain+ '/authentication/register',user);
    }
}