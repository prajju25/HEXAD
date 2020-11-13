import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiServiceService } from './service/api-service.service';

describe('AppComponent', () => {
  let router: Router;
  let appComponent: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        ApiServiceService
      ]
    }).compileComponents();
  });

  beforeEach(()=>{
    const fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    router = TestBed.get(Router);
  })

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('#logout() Function call', () => {
    spyOn(router,'navigate');
    router.navigate(['login']);
    appComponent.logout();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

});
