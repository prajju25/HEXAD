import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiServiceService } from '../service/api-service.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let router: Router;
  let component: LoginComponent;
  let apiService: ApiServiceService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        ApiServiceService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    apiService = TestBed.get(ApiServiceService);
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('#login() Success Case', ()=> {
    component.username = "jon";
    component.password = "password123";
    let response = {
      "status": "success",
      "data": {"userName":"jon","password":"password123","bookList":[]}
    }
    spyOn(apiService,'login').and.returnValue(Promise.resolve(response));
    spyOn(router,'navigate');
    router.navigate(['library']);
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['library']);
  });

  it('#login() Failure Case', ()=> {
    component.username = "test";
    component.password = "test";
    let response = {
      "status": "error"
    }
    spyOn(apiService,'login').and.returnValue(Promise.resolve(response));
    component.login();
    expect(apiService.login).toHaveBeenCalled();
  });

  it('#login() Exception Case', ()=> {
    component.username = "jon";
    component.password = "password123";
    spyOn(apiService,'login').and.returnValue(Promise.reject(new Error('error')));
    component.login();
    expect(apiService.login).toHaveBeenCalled();
  });
});
