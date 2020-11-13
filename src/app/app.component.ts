import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from './service/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  
  constructor(private apiService: ApiServiceService, public router: Router){}

  logout(){
    this.apiService.clearUserData();
    this.router.navigate(['login']);
  }
}
