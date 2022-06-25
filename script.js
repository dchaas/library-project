// DOM elements
const tbl = document.querySelector('.tbody');
const newBook = document.querySelector('#new-book');
const formDiv = document.querySelector('.form-popup');
const addBook = document.querySelector('#add-book');
const container = document.querySelector('.card-container');

const titleEntry = document.querySelector('#title');
const authorEntry = document.querySelector('#author');
const pagesEntry = document.querySelector('#pages');
const readEntry = document.querySelector('#read');;

newBook.addEventListener('click', function() {
    formDiv.classList.remove('hidden')});

// setup the library array
let myLibrary = [];

// make a JS object constructor
function Book(title, author, numPages,read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${numPages} pages, ${read}`;
    }
}

// define the read book prototype function
Book.prototype.readBook = function() {
    this.read = !this.read;
}

// helper functions to add books to the library and display them
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    while (tbl.firstChild) {
        tbl.removeChild(tbl.firstChild);
    }
    myLibrary.forEach((book)=> {
        // create a table entry for the book
        let row = document.createElement("tr");
        let title = document.createElement("td");
        let author = document.createElement("td");
        let pages = document.createElement("td");
        let finishedTd = document.createElement("td");
        let finished = document.createElement("button");
        let removeTd = document.createElement("td");
        let remove = document.createElement("button");
        remove.innerHTML = "Delete";
        remove.setAttribute("data",book.title);
        remove.classList.add('delete-btn');
        remove.addEventListener('click', (event) => {
            deleteBook(event.target.getAttribute("data"));
        });
        
        finished.setAttribute("data",book.title);
        finished.addEventListener('click', (event) => {
            markRead(event.target.getAttribute("data"));
        });

        removeTd.appendChild(remove);
        finishedTd.appendChild(finished);

        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pages.innerHTML = book.numPages;
        finished.innerHTML = book.read ? "Yes" : "No";
        if (book.read) {
            finished.classList.add('read-book');
        }

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(finishedTd);
        row.appendChild(removeTd);
        tbl.appendChild(row);
    });
}

function cardHTML(book) {
    let html = `
    <div class="card" id="${book.title.replace(/\s/g,'')}">
            <h3 class="card-title">${book.title}</h3>
            <p class="card-author">by ${book.author}</p>
            <p class="card-pages"># Pages: ${book.numPages}</p>
            <button class="card-read" id="read-${book.title.replace(/\s/g,'')}" data="${book.title}">${book.read ? "Read" : "Unread"}</button>
            <button class="card-delete" id="delete-${book.title.replace(/\s/g,'')}" data="${book.title}">Delete</button>
        </div>

    `;
    return html
}

function displayBooksCard() {
    container.innerHTML = ''; // clear out the contents
    myLibrary.forEach((book)=> {
        container.innerHTML += cardHTML(book);
        
         let finished = document.querySelector(`#read-${book.title.replace(/\s/g,'')}`);
         if (book.read) {
            finished.classList.add('read-book');
         }
    });
    // asssign the delete button functionality
    let btns = document.querySelectorAll('.card-delete');
    btns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            deleteBook(event.target.getAttribute("data"));
        });
    });
    // asssign the read button functionality
    let readBtns = document.querySelectorAll('.card-read');
    readBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            markRead(event.target.getAttribute("data"));
        });
    });


    }

addBook.addEventListener('click', function() {
    const book = new Book(titleEntry.value,authorEntry.value,pagesEntry.value,readEntry.checked);
    titleEntry.value = "";
    authorEntry.value = "";
    pagesEntry.value = "";
    readEntry.checked = false;
    addBookToLibrary(book);
    console.log(myLibrary);
    displayBooksCard();
    formDiv.classList.add('hidden');
});


function deleteBook(bTitle) {
    myLibrary = myLibrary.filter(book => book.title!==bTitle);
    //console.log(bTitle);
    displayBooksCard();
}

function markRead(bTitle) {
    let id = myLibrary.findIndex(book => {return book.title===bTitle}); 
    //console.log(myLibrary[id]);
    myLibrary[id].readBook();
    displayBooksCard();
}


// give it some starting content
const b1 = new Book('Pelican Brief', 'Grisham',580,true);
const b2 = new Book('Behind Enemey Lines', 'Clancy',343,false);
addBookToLibrary(b1);
addBookToLibrary(b2);
displayBooksCard();