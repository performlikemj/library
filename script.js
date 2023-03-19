let myLibrary = [];


function Book(title, author, pages, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead

}

Book.prototype.toTableRow = function(index) {
    return `<tr data-index="${index}">
        <td>${this.title}</td>
        <td>${this.author}</td>
        <td>${this.pages}</td>
        <td>${this.hasBeenRead}</td>
        <td>
            <button class="toggle-read">Toggle Read</button>
            <button class="remove-book">Remove</button>
        </td>
    </tr>`;
}

Book.prototype.toggleReadStatus = function() {
    this.hasBeenRead = this.hasBeenRead === 'Yes' ? 'No' : 'Yes';
}

// Modify addBookToLibrary function to accept separate arguments
function addBookToLibrary(title, author, pages, hasBeenRead) {
    let newBook = new Book(title, author, pages, hasBeenRead);
    myLibrary.push(newBook);
}

function bookLoop() {
    let libraryBody = document.getElementById('library-body');
    let libraryTable = document.getElementById('library-table');
    let newBookBtn = document.getElementById('new-book-btn');
    libraryBody.innerHTML = '';

    if (myLibrary.length === 0) {
        libraryTable.classList.add('hidden');
        newBookBtn.classList.remove('hidden');
    } else {
        libraryTable.classList.remove('hidden');
        newBookBtn.classList.add('hidden');
    }

    myLibrary.forEach((book, index) => {
        libraryBody.innerHTML += book.toTableRow(index);
    });

    libraryBody.querySelectorAll('.toggle-read').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            myLibrary[index].toggleReadStatus();
            bookLoop();
        });
    });

    libraryBody.querySelectorAll('.remove-book').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            myLibrary.splice(index, 1);
            bookLoop();
        });
    });
}

const newBookBtn = document.getElementById('new-book-btn');
const bookForm = document.getElementById('book-form');
const trs = document.querySelector('thead').querySelectorAll('tr');

newBookBtn.addEventListener('click', function() {
    bookForm.classList.toggle('hidden');
});

bookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let hasBeenRead = document.getElementById('has-been-read').checked ? 'Yes' : 'No';

    addBookToLibrary(title, author, pages, hasBeenRead);
    bookLoop();

    bookForm.reset();
    bookForm.classList.add('hidden');
});

