import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

const apiServiceSpy = jasmine.createSpyObj('ApiServiceService',['login']);
const routerSpy = jasmine.createSpyObj('Router',['login']);

describe('LoginComponent', () => {
  let component: LoginComponent;

  beforeEach(async () => {
    component = new LoginComponent(apiServiceSpy,routerSpy);
  });

  it('Call Login', () => {
    component.username = 'jon';
    component.password = 'password123';
    expect(component.login()).toHaveBeenCalled();
  });
});
