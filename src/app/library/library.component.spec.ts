import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiServiceService } from '../service/api-service.service';

import { LibraryComponent } from './library.component';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;
  let apiService: ApiServiceService;

  let userbookList = [{"id":2,"title":"C++","desc":"check checkl"},{"id":5,"title":"Node.JS","desc":"check 123"}];
  let response = {"userName":"jon","password":"password123","bookList":userbookList};
  let bookLists = [{"id":1,"title":"Java","desc":"test test","quantity":6,"available":4},
  {"id":2,"title":"C++","desc":"check checkl","quantity":1,"available":0},
  {"id":5,"title":"Node.JS","desc":"check 123","quantity":2,"available":2}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ LibraryComponent ],
      providers: [
        ApiServiceService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    sessionStorage.setItem('userData', JSON.stringify(response));
    fixture.detectChanges();
    apiService = TestBed.get(ApiServiceService);
  });

  it('should create LibraryComponent', () => {
    expect(component).toBeTruthy();
  });
  
  it('#ngOnInit() fetch librabry books Success Case', ()=> {
    spyOn(apiService,'getLibraryBooks').and.returnValue(Promise.resolve(bookLists));
    component.ngOnInit();
    expect(apiService.getLibraryBooks).toHaveBeenCalled();
  });

  it('#ngOnInit() fetch librabry books failure Case', ()=> {
    spyOn(apiService,'getLibraryBooks').and.returnValue(Promise.reject(new Error('error')));
    component.ngOnInit();
    expect(apiService.getLibraryBooks).toHaveBeenCalled();
  });

  it('#addBook(book) Success Case', ()=> {
    let book = {
      "id":1,"title":"Java","desc":"test test"
    }
    let response = {
      "status": "success"
    }
    component.userBookList = userbookList;
    component.bookList = bookLists;
    spyOn(apiService,'updateCart').and.returnValue(Promise.resolve(response));
    component.addBook(book);
    expect(apiService.updateCart).toHaveBeenCalled();
  });


  it('#addBook(book) Error Case', ()=> {
    let book = {
      "id":1,"title":"Java","desc":"test test"
    }
    let response = {
      "status": "error"
    }
    component.userBookList = userbookList;
    component.bookList = bookLists;
    spyOn(apiService,'updateCart').and.returnValue(Promise.resolve(response));
    component.addBook(book);
    expect(apiService.updateCart).toHaveBeenCalled();
  });

  it('#removeBook(book) Success Case', ()=> {
    let book = {
      "id":1,"title":"Java","desc":"test test"
    }
    let response = {
      "status": "success"
    }
    component.bookList = bookLists;
    spyOn(apiService,'updateCart').and.returnValue(Promise.resolve(response));
    component.removeBook(book);
    expect(apiService.updateCart).toHaveBeenCalled();
  });

  it('#removeBook(book) Error Case', ()=> {
    let book = {
      "id":1,"title":"Java","desc":"test test"
    }
    let response = {
      "status": "error"
    }
    component.bookList = bookLists;
    spyOn(apiService,'updateCart').and.returnValue(Promise.resolve(response));
    component.removeBook(book);
    expect(apiService.updateCart).toHaveBeenCalled();
  });

  it('#checkAddDisabled(book)', ()=>{
    component.userBookList = userbookList;
    let isDisabled = component.checkAddDisabled(bookLists[0]);
    expect(isDisabled).toEqual(true);
  });

  it('#checkRemoveDisabled(book)', ()=>{
    component.userBookList = userbookList;
    let isDisabled = component.checkRemoveDisabled(bookLists[0]);
    expect(isDisabled).toEqual(true);
  });
});
