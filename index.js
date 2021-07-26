console.log('hello');

// Constructor
function Book(name, author, type){
    this.name  = name;
    this.author = author;
    this.type = type;
}

// display constructor
function Display(){
 
}


// add methods to display protoypes
Display.prototype.add = function(book){
    console.log("adding to ui");
    let tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`
    tableBody.innerHTML += uiString;
}


Display.prototype.clear = function(){
    let libraryForm = document.getElementById('libraryForm')
    libraryForm.reset();
}

Display.prototype.validate = function(book){
    if(book.name.length<2 ||book.author.length<2){
        return false;
    }
    return true;
}

Display.prototype.show = function(type , displayMessage){
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




// add submit event listner to form
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
    console.log(book);

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
