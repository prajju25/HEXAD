import { Component, OnInit } from '@angular/core';
import { Book } from '../interface/book';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-borrowed-cart',
  templateUrl: './borrowed-cart.component.html',
  styleUrls: ['./borrowed-cart.component.scss']
})
export class BorrowedCartComponent implements OnInit {

  borrowedList: Array<Book>=[];
  constructor(private apiService : ApiServiceService) { }

  ngOnInit(): void {
    this.borrowedList = this.apiService.getUserData().bookList;
  }

  removeBook(book){
    this.apiService.updateCart(book,'remove').then((res)=>{
      if(res['status'] == 'success'){
        this.borrowedList = this.borrowedList.reduce((acc, item)=>{
          if(book.id != item.id){
            acc.push(item);
          }
          return acc;
        },[]);
        this.apiService.storeUserBooks(this.borrowedList);
      } else {
        console.log("removeBook() : Remove Book Service call gave error");
      }
    });;
  }

}
