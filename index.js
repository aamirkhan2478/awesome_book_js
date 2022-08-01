// Declare variables.
const bookData = document.getElementById("data");
const submit = document.getElementById("submit");
const title = document.getElementById("title");
const anchor = document.getElementById("anchor");

document.addEventListener("DOMContentLoaded", () => {
  let str = "";

  const showData = () => {
    if (localStorage.getItem("book") === null) {
      let bookArr = [];
      localStorage.setItem("book", JSON.stringify(bookArr));
    } else {
      let bookArrStr = localStorage.getItem("book");
      bookArr = JSON.parse(bookArrStr);
    }
    bookArr.map((data, index) => {
      console.log(data);
      str += `
              <p>${data[0]}</p>
              <p>${data[1]}</p>
              <button onclick='remove(${index})'>Remove</button>
              <hr>
          `;
    });
    bookData.innerHTML = str;
  };

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    let bookTitle = title.value;
    let bookAnchor = anchor.value;
    if (localStorage.getItem("book") === null) {
      let bookArr = [];
      bookArr.push([bookTitle, bookAnchor]);
      localStorage.setItem("book", JSON.stringify(bookArr));
    } else {
      let bookArrStr = localStorage.getItem("book");
      bookArr = JSON.parse(bookArrStr);
      bookArr.push([bookTitle, bookAnchor]);
      localStorage.setItem("book", JSON.stringify(bookArr));
    }
    title.value = "";
    anchor.value = "";
    str = "";
    bookData.innerHTML = str;
    showData();
  });

  remove = (id) => {
    let bookArrStr = localStorage.getItem("book");
    bookArr = JSON.parse(bookArrStr);
    bookArr.splice(id, 1);
    localStorage.setItem("book", JSON.stringify(bookArr));
    str = "";
    bookData.innerHTML = str;
    showData();
  };

  showData();
});
