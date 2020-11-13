import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { doesNotReject } from 'assert';
import { ApiServiceService } from '../service/api-service.service';

import { BorrowedCartComponent } from './borrowed-cart.component';

describe('BorrowedCartComponent', () => {
  let component: BorrowedCartComponent;
  let fixture: ComponentFixture<BorrowedCartComponent>;
  let apiService: ApiServiceService;
  
  let bookList = [{"id":1,"title":"Java","desc":"test test"},{"id":5,"title":"Node.JS","desc":"check 123"}];
  let response = {"userName":"jon","password":"password123","bookList":bookList};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ BorrowedCartComponent ],
      providers: [
        ApiServiceService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowedCartComponent);
    component = fixture.componentInstance;
    sessionStorage.setItem('userData', JSON.stringify(response));
    fixture.detectChanges();
    apiService = TestBed.get(ApiServiceService);
  });
  
  it('should create BorrowedCartComponent', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() Success Case', ()=> {
    spyOn(apiService,'getUserData').and.returnValue(response);
    component.ngOnInit();
    expect(component.borrowedList).toEqual(bookList);
  });

  it('#removeBook(book) Success Case', ()=> {
    let book = {
      "id":1,"title":"Java","desc":"test test"
    }
    let response = {
      "status": "success"
    }
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
    spyOn(apiService,'updateCart').and.returnValue(Promise.resolve(response));
    component.removeBook(book);
    expect(apiService.updateCart).toHaveBeenCalled();
  });
});
