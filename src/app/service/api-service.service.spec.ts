import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ApiServiceService } from './api-service.service';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let http: HttpClient;

  let userbookList = [{"id":1,"title":"Java","desc":"test test"},{"id":5,"title":"Node.JS","desc":"check 123"}];
  let user = {"userName":"jon","password":"password123","bookList":userbookList};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiServiceService);
  });

  beforeEach(()=>{
    http = TestBed.get(HttpClient);
    service.user = user;
  })

  it('ApiServiceService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login()', () => {
    let request = {
      userName: "jon",
      password: "password123"
    };
    spyOn(http,'post').and.returnValue(new Observable);
    service.login(request);
    expect(http.post).toHaveBeenCalled();
  });

  it('#getLibraryBooks()', () => {
    spyOn(http,'get').and.returnValue(new Observable);
    service.getLibraryBooks();
    expect(http.get).toHaveBeenCalled();
  });

  it('#storeUserData()', () => {
    spyOn(sessionStorage,'setItem');
    sessionStorage.setItem('userData', JSON.stringify(user));
    service.storeUserData(user);
    expect(sessionStorage.setItem).toHaveBeenCalled();
  });
  
  it('#getUserData()', () => {
    sessionStorage.setItem('userData', JSON.stringify(user));
    let res = service.getUserData();
    expect(res).toEqual(user);
  });

  it('#clearUserData()', () => {
    spyOn(sessionStorage,'setItem');
    sessionStorage.setItem('userData', null);
    service.clearUserData();
    expect(sessionStorage.setItem).toHaveBeenCalled();
  });

  it('#updateCart(book,status)', () => {
    let book = {"id":5,"title":"Node.JS","desc":"check 123"};
    spyOn(http,'post').and.returnValue(new Observable);
    service.updateCart(book,'add');
    expect(http.post).toHaveBeenCalled();
  });

  it('#storeUserBooks(bookList)', () => {
    let book = {"id":5,"title":"Node.JS","desc":"check 123"};
    spyOn(service,'storeUserData');
    service.storeUserBooks(book);
    expect(service.storeUserData).toHaveBeenCalled();
  });
});
