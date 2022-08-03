// Declare variables.
const bookData = document.getElementById("data");
const submit = document.getElementById("submit");
const title = document.getElementById("title");
const author = document.getElementById("author");
const item = document.getElementById("items");
const bookAdd = document.getElementById("add");
const contact = document.getElementById("contact");
const addBook = document.getElementById("Added");
const listedBook = document.getElementById("listed");
const contactedBook = document.getElementById("contacted");
const message = document.getElementById("msg");

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

    bookList() {
      listed.classList.remove("hide-list");
      addBook.classList.remove("show-addbook");
      contactedBook.classList.remove("show-contact");
      bookAdd.style.color = "black";
      item.style.color = "blue";
      contact.style.color = "black";
    }

    bookAdd() {
      listed.classList.add("hide-list");
      addBook.classList.add("show-addbook");
      contactedBook.classList.remove("show-contact");
      bookAdd.style.color = "blue";
      item.style.color = "black";
      contact.style.color = "black";
    }

    contactAdd() {
      listed.classList.add("hide-list");
      addBook.classList.remove("show-addbook");
      contactedBook.classList.add("show-contact");
      bookAdd.style.color = "black";
      item.style.color = "black";
      contact.style.color = "blue";
    }

    // Add books in array and save in localStorage
    addBook() {
      const bookTitle = title.value;
      const bookAuthor = author.value;
      const book = new Book(bookTitle, bookAuthor);
      // message.classList.add('remove-msg')

      // Check if title and author field is empty or not
      if (title.value === "") {
        message.innerHTML = "Please enter a book title";
        title.style.border = '3px solid red';
      } else if (author.value === "") {
        message.innerHTML = "Please enter a book author";
        author.style.border = '2px solid red';
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
      setTimeout(() => {
        message.style.display = 'none';
        message.style.border = '2px solid black';
      }, 2500);
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

  item.addEventListener("click", () => {
    const book = new Book();
    book.bookList();
  });

  bookAdd.addEventListener("click", () => {
    const book = new Book();
    book.bookAdd();
  });

  contact.addEventListener("click", () => {
    const book = new Book();
    book.contactAdd();
  });

  const book = new Book();
  book.showBook();
});
