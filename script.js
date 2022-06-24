// DOM elements
let tbl = document.querySelector('.tbody');

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

const b1 = new Book('Pelican Brief', 'Grisham',580,true);
const b2 = new Book('Behind Enemey Lines', 'Clancy',343,false);

addBookToLibrary(b1);
addBookToLibrary(b2);

displayBooks();