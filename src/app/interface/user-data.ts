import { Book } from './book';

export interface UserData {
    userName: String;
    password: String;
    bookList?: Array<Book>
}
