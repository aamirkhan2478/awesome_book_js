// Declare variables.
const bookData = document.getElementById("data");
const submit = document.getElementById("submit");
const title = document.getElementById("title");
const author = document.getElementById("author");

document.addEventListener("DOMContentLoaded", () => {
  // Declare global variables
  let str = "";
  let bookArr = [];

  class Book {
    // Create book object
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }

    // Show Books in DOM
    showBook() {
      // Check localStorage
      if (localStorage.getItem("book") === null) {
        localStorage.setItem("book", JSON.stringify(bookArr));
      } else {
        const bookArrStr = localStorage.getItem("book");
        bookArr = JSON.parse(bookArrStr);
      }

      // Check if array is empty then show this message
      if (bookArr.length === 0) {
        str += `
          <div class = 'points'>
          <p style='color: red'>Data not Found</p>
          </div>
      `;
        bookData.innerHTML = str;
      }

      // Fetch all the data from array
      bookArr.map((data, index) => {
        str += `
          <div class = 'points'>
          <p>"${data.title}" by ${data.author}</p>
          <button onclick='removeItem(${index})'>Remove</button>
          </div>
      `;
        return str;
      });
      bookData.innerHTML = str;
    }

    // Add books in array and save in localStorage
    addBook() {
      const bookTitle = title.value;
      const bookAuthor = author.value;
      const book = new Book(bookTitle, bookAuthor);

      // Check if title and author field is empty or not
      if (title.value === "") {
        alert("Please enter a book title");
      } else if (author.value === "") {
        alert("Please enter a book author");
      } else {
        if (localStorage.getItem("book") === null) {
          bookArr.push(book);
          localStorage.setItem("book", JSON.stringify(bookArr));
        } else {
          const bookArrStr = localStorage.getItem("book");
          bookArr = JSON.parse(bookArrStr);
          bookArr.push(book);
          localStorage.setItem("book", JSON.stringify(bookArr));
        }
        title.value = "";
        author.value = "";
        str = "";
        bookData.innerHTML = str;
        this.showBook();
      }
    }

    // Remove the book data by id
    removeBook(id) {
      const bookArrStr = localStorage.getItem("book");
      bookArr = JSON.parse(bookArrStr);
      bookArr.splice(id, 1);
      localStorage.setItem("book", JSON.stringify(bookArr));
      str = "";
      bookData.innerHTML = str;
      this.showBook();
    }
  }

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const book = new Book();
    book.addBook();
  });

  removeItem = (id) => {
    const book = new Book();
    book.removeBook(id);
  };

  const book = new Book();
  book.showBook();
});
