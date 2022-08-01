// Declare variables.
const bookData = document.getElementById('data');
const submit = document.getElementById('submit');
const title = document.getElementById('title');
const anchor = document.getElementById('anchor');

document.addEventListener('DOMContentLoaded', () => {
  let str = '';
  let bookArr = [];

  const showData = () => {
    if (localStorage.getItem('book') === null) {
      localStorage.setItem('book', JSON.stringify(bookArr));
    } else {
      const bookArrStr = localStorage.getItem('book');
      bookArr = JSON.parse(bookArrStr);
    }
    bookArr.map((data, index) => {
      str += `
              <p>${data[0]}</p>
              <p>${data[1]}</p>
              <button onclick='remove(${index})'>Remove</button>
              <hr>
          `;
      return str;
    });
    bookData.innerHTML = str;
  };

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const bookTitle = title.value;
    const bookAnchor = anchor.value;
    if (localStorage.getItem('book') === null) {
      const bookArr = [];
      bookArr.push([bookTitle, bookAnchor]);
      localStorage.setItem('book', JSON.stringify(bookArr));
    } else {
      const bookArrStr = localStorage.getItem('book');
      bookArr = JSON.parse(bookArrStr);
      bookArr.push([bookTitle, bookAnchor]);
      localStorage.setItem('book', JSON.stringify(bookArr));
    }
    title.value = '';
    anchor.value = '';
    str = '';
    bookData.innerHTML = str;
    showData();
  });

  remove = (id) => {
    const bookArrStr = localStorage.getItem('book');
    bookArr = JSON.parse(bookArrStr);
    bookArr.splice(id, 1);
    localStorage.setItem('book', JSON.stringify(bookArr));
    str = '';
    bookData.innerHTML = str;
    showData();
  };

  showData();
});
