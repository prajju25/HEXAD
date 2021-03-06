import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';
import { UserData } from '../interface/user-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  username: String;
  password: String;

  constructor(private apiService: ApiServiceService, private router: Router) { }
  
  login(){
    let user: UserData = {
      userName: this.username,
      password: window.btoa(this.password.toString())
    }
    this.apiService.login(user).then((res)=>{
      if(res['status'] == 'success'){
        this.apiService.storeUserData(res['data']);
        this.router.navigate(['library']);
      } else {
        console.log("login() : Login Failed");        
      }
    }).catch((err)=>{
      console.log(err);
    });
  }

}
