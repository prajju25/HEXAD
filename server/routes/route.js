const express = require('express');
const router = express.Router();
var env = require('../config/config');
const fs = require('fs');
const USER_FILE = __dirname + '\\..\\config\\user-data.json';
const BOOK_LIST =__dirname + '\\..\\config\\book-list.json';



router.post('/login', (req, res) => {
    let response = null;
    let userName = req.body.userName;
    let password = Buffer.from(req.body.password, 'base64').toString();

    if(userName != null){        
        try{
            let rawdata = fs.readFileSync(USER_FILE);
            let userData = JSON.parse(rawdata).response;
            let user = userData.find((user)=>{ return user.userName == userName && user.password == password});
            if(user){
                response = {
                    status: "success",
                    data: user
                }
            }
        } catch(err) {
            response = {
                status: "error",
                data: err
            }
        }
    }
    res.json(response);
});

router.post('/updateCart', (req, res) => {
    let userName = req.body.userName;
    let book = req.body.book;
    let status = req.body.status;
    let userUpdate = false;
    let bookUpdate = false;
    let response = null;

    if(userName!=null){
        try{
            let rawdata = fs.readFileSync(USER_FILE);
            let userData = JSON.parse(rawdata).response;      
            delete book.quantity;
            delete book.available;
            if(userData){
                userData = userData.map((user)=>{
                    if(user.userName == userName){                    
                        if(status == 'add' && !user.bookList.some((val)=> val.id == book.id)){
                            user.bookList.push(book);
                        } else if (status == 'remove'){
                            user.bookList.pop(book);
                        }
                    }
                    return user;
                });
                let newData = {
                    "status": "success",
                    "response": userData
                }
                fs.writeFileSync(USER_FILE, JSON.stringify(newData));
                userUpdate = true;
            }

            let rawBookData = fs.readFileSync(BOOK_LIST);
            let bookData = JSON.parse(rawBookData).response;
            if(bookData){
                bookData = bookData.map((item)=>{
                    if(item.id == book.id){
                        if(status == 'add'){
                            item.available--;
                        } else if (status == 'remove'){
                            item.available++;
                        }
                    }
                    return item;
                });
                let newData = {
                    "status": "success",
                    "response": bookData
                }
                fs.writeFileSync(BOOK_LIST, JSON.stringify(newData));
                bookUpdate = true;
            }
            response = {
                status: userUpdate && bookUpdate ? "success" : "error",
                userUpdate: userUpdate,
                bookUpdate: bookUpdate
            }
        } catch(err) {
            response = {
                status: "error",
                data: err
            }
        }
    }
    res.json(response);
});

router.get('/booklist', (req, res) => {
    let response = null;

    try{
        let rawdata = fs.readFileSync(BOOK_LIST);
        let bookList = JSON.parse(rawdata).response;
        response = {
            status: "success",
            data: bookList
        }
    } catch(err) {
        response = {
            status: "error",
            data: err
        }
    }
    res.json(response);

});

module.exports = router;