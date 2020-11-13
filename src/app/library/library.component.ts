import { Component, OnInit } from '@angular/core';
import { Book } from '../interface/book';

import {ApiServiceService} from '../service/api-service.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  bookList: Array<Book> = [];
  userBookList = [];
  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.getLibraryBooks().then((res)=>{
      this.bookList = res['data'];
    }).catch((err)=>{
      console.log(err);
    });
    this.userBookList = this.apiService.getUserData().bookList;
  }  

  addBook(book){
    this.apiService.updateCart(book,'add').then((res)=>{
      if(res['status'] == 'success'){
        if(!this.userBookList.some((val)=> val.id == book.id)){
          this.userBookList.push(book);
        }

        this.bookList = this.bookList.map((val)=>{
          if(val.id == book.id){
            val.available--;
          }
          return val;
        });
        this.apiService.storeUserBooks(this.userBookList);
      } else {
        console.log("addBook() : Add Book Service call gave error");
      }
    });
  }

  removeBook(book){
    this.apiService.updateCart(book,'remove').then((res)=>{
      if(res['status'] == 'success'){
        this.userBookList = this.userBookList.reduce((acc, item)=>{
          if(book.id != item.id){
            acc.push(item);
          }
          return acc;
        },[]);
        this.bookList = this.bookList.map((val)=>{
          if(val.id == book.id){
            val.available++;
          }
          return val;
        });
        this.apiService.storeUserBooks(this.userBookList);
      } else {
        console.log("removeBook() : Remove Book Service call gave error");        
      }
    });;
  }

  checkAddDisabled(book){
    return !book['available'] || (this.userBookList && this.userBookList.some((val)=> val.id == book.id));
  }

  checkRemoveDisabled(book){
    return this.userBookList && this.userBookList.some((val)=> val.id == book.id)
  }

}
