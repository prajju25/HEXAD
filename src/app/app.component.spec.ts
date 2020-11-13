import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { browser, by, element } from 'protractor';
import { AppComponent } from './app.component';

xdescribe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  xit('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /* it('should have as title Hexad Library Management', () => {
    browser.get('http://localhost:4200/login');
    var header = element(by.tagName('h1'));
    expect(header.get(1).getText()).toEqual('Hexad Library Management');
  }); */
});
