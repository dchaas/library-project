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

// make a book class
class Book  {
    constructor(title,author,numPages,read) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
    }
   
    info()  {
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read}`;
    }

    readBook = function() {
        this.read = !this.read;
    }
}

// make a library class
class Library {
    constructor() {
        this.myLibrary = [];
    }

    addBookToLibrary(book) {
        this.myLibrary.push(book);
    }

    displayBooksCard() {
        container.innerHTML = ''; // clear out the contents
        this.myLibrary.forEach((book)=> {
            container.innerHTML += this.cardHTML(book);
            
             let finished = document.querySelector(`#read-${book.title.replace(/\s/g,'')}`);
             if (book.read) {
                finished.classList.add('read-book');
             }
        });
        // asssign the delete button functionality
        let btns = document.querySelectorAll('.card-delete');
        btns.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                this.deleteBook(event.target.getAttribute("data"));
            });
        });
        // asssign the read button functionality
        let readBtns = document.querySelectorAll('.card-read');
        readBtns.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                this.markRead(event.target.getAttribute("data"));
            });
        });
    
    
    }

    cardHTML(book) {
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

    deleteBook(bTitle) {
        this.myLibrary = this.myLibrary.filter(book => book.title!==bTitle);
        //console.log(bTitle);
        this.displayBooksCard();
    }
    
    markRead(bTitle) {
        let id = this.myLibrary.findIndex(book => {return book.title===bTitle}); 
        //console.log(myLibrary[id]);
        this.myLibrary[id].readBook();
        this.displayBooksCard();
    }

    addBook() {
        const book = new Book(titleEntry.value,authorEntry.value,pagesEntry.value,readEntry.checked);
        titleEntry.value = "";
        authorEntry.value = "";
        pagesEntry.value = "";
        readEntry.checked = false;
        this.addBookToLibrary(book);
        console.log(myLibrary);
        this.displayBooksCard();
        formDiv.classList.add('hidden');
    }
    
}

const library = new Library();


addBook.addEventListener('click', library.addBook.bind(library));

// give it some starting content
const b1 = new Book('Pelican Brief', 'Grisham',580,true);
const b2 = new Book('Behind Enemey Lines', 'Clancy',343,false);
library.addBookToLibrary(b1);
library.addBookToLibrary(b2);
library.displayBooksCard();