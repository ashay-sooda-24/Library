console.log('es6 version')


class Book{
    constructor(name, author, type){
        this.name  = name;
        this.author = author;
        this.type = type;
    }
}

class Display{

    // function to show the book list at the beginning
    showStart(){
        
            console.log("adding to ui");
            let books = localStorage.getItem("books")
            let booksObj;
            if(books ==null){
                booksObj = [];
            }
            else{
                booksObj = JSON.parse(books);
            }

            let tableBody = document.getElementById('tableBody');
            tableBody.innerHTML=''
            booksObj.forEach(element => {
                tableBody.innerHTML +=  `<tr>
                <td>${element.name}</td>
                <td>${element.author}</td>
                <td>${element.type}</td>
                </tr>`
            });
            localStorage.setItem('books',JSON.stringify(booksObj))
        
    }
                
            
            
            
    // function to add books
    add(book){
        console.log("adding to ui");let books = localStorage.getItem("books")
        let myBook={
            name:book.name,
            author: book.author,
            type: book.type
        }
        let booksObj;
        if(books ==null){
            booksObj = [];
        }
        else{
            booksObj = JSON.parse(books);
        }
        // console.log(books)
        booksObj.push(myBook);
        let tableBody = document.getElementById('tableBody');
        let uiString;
        booksObj.forEach(element => {
             uiString = `<tr>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            </tr>`
        });
            
        tableBody.innerHTML += uiString;
        
        
        
        localStorage.setItem('books',JSON.stringify(booksObj))
    }

    clear(){
        let libraryForm = document.getElementById('libraryForm')
        libraryForm.reset();
    }

    validate(book){
        if(book.name.length<2 ||book.author.length<2){
            return false;
        }
        return true;
    }

    show(type , displayMessage){
        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>Messge:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
    
        setTimeout(() => {
            message.innerHTML = ''
        }, 2000);
    }
}

// add submit event listner to form
let display = new Display()
display.showStart();
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit)

function libraryFormSubmit(e){
    console.log('clicked library form');

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    
    // radio button grabbing
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    let type; 
    if (fiction.checked){
        type = fiction.value;
    }else if(programming.checked){
        type= programming.value;
    }else if(cooking.checked){
        type =cooking.value;
    }
    

    let book = new Book(name, author, type)
    // console.log(book);

    let display = new Display();
    
    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success','book added succesfully')
    }else{
        display.show('danger', 'book could not be added')
    }



    e.preventDefault();
}
