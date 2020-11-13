import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserData } from '../interface/user-data';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  public user:UserData;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };  
  
  constructor(private http: HttpClient) { }
  
  login(request: UserData): Promise<Object> {
    return this.http.post('http://localhost:4000/login', request, this.httpOptions).toPromise();
  }
  getLibraryBooks():Promise<Object> {
    return this.http.get('http://localhost:4000/booklist').toPromise();
  }
  storeUserData(user: UserData){
      this.user = user;
      sessionStorage.setItem('userData', JSON.stringify(user));
  }
  getUserData(): UserData{
    if(this.user == null){
      let user = sessionStorage.getItem('userData');
      this.user = JSON.parse(user);
    }
    return this.user;
  }
  clearUserData(){
    sessionStorage.setItem('userData', null);
    this.user = null;
  }
  updateCart(book, status){
    let req = null;
    if(this.user != null){
      req = {
        userName: this.user.userName,
        book: book,
        status: status
      }
    }
    return this.http.post('http://localhost:4000/updateCart', req, this.httpOptions).toPromise();
  }
  storeUserBooks(bookList){
    this.user.bookList = bookList;
    this.storeUserData(this.user);
  }
}