import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegisterComponent } from "../register/register.component";
@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {
 
  constructor(private reg:RegisterComponent) { 

  } 
    logout(){
      var User = this.reg.user;
      var sub = this.reg.auth.register(User).subscribe();
      sub.unsubscribe();
      alert('out')
    }
}
