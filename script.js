// DOM elements
let tbl = document.querySelector('.tbody');
let newBook = document.querySelector('#new-book');
let formDiv = document.querySelector('.form-popup');
let addBook = document.querySelector('#add-book');

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
        let finished = document.createElement("td");
        let removeTd = document.createElement("td");
        let remove = document.createElement("button");
        remove.innerHTML = "Delete";
        removeTd.appendChild(remove);

        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pages.innerHTML = book.numPages;
        finished.innerHTML = book.read;

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(finished);
        row.appendChild(removeTd);
        tbl.appendChild(row);
    });
}

//const b1 = new Book('Pelican Brief', 'Grisham',580,true);
//const b2 = new Book('Behind Enemey Lines', 'Clancy',343,false);

addBook.addEventListener('click', function() {
    const book = new Book(titleEntry.value,authorEntry.value,pagesEntry.value,readEntry.checked);
    console.log(book);
    addBookToLibrary(book);
    console.log(myLibrary);
    displayBooks();
    formDiv.classList.add('hidden');
});

addBookToLibrary(b1);
addBookToLibrary(b2);