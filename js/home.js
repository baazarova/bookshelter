let url = "https://www.googleapis.com/books/v1/volumes?q=search+terms";
let list = document.querySelector(".books-list");
let savedList = document.querySelector(".bookmark-list");
let resultsCount = document.querySelector(".results");
let logOut = document.querySelector(".log-out-btn");
let bookArr = [];
let modal = document.querySelector(".modal");
let sortBtn = document.querySelector(".sort-btn");
let options = {
  method: "GET",
};

if(!localStorage.length){
    window.location.replace("./login.html")
}

logOut.addEventListener("click", (e) => {
  e.preventDefault();
  async function logOut() {
    let response = await fetch(url, options);
    let data = await response.json();
    if (!data.id) {
      localStorage.clear();
      window.location.replace("../login.html");
    }
  }
  logOut();
});

fetch(url, options)
  .then((response) => response.json())
  .then((response) => renderBooks(response.items));

let count = 0;
function renderBooks(data) {
  for (let i of data) {
    count += 1;
    bookArr.push(i);
    resultsCount.textContent = `Showing ${count} Result(s)`;
    let item = document.createElement("li");
    item.classList = "book-item";
    item.innerHTML = `
    <div class="img-div">
    <img class="books-img" src="${i.volumeInfo.imageLinks.thumbnail}" alt="" />
  </div>
      <h3 class="books-title">${i.volumeInfo.title}</h3>
      <p class="books-author">${i.volumeInfo.authors}</p>
      <p class="books-year">${i.volumeInfo.publishedDate}</p>
      <div class="books-btn-div">
        <div class="btn-top-div">
          <button id="${i.id}" class="bookmark-btn">Bookmark</button>
          <button id="${i.id}"  class="info-btn">More Info</button>
        </div>
        <div class="btn-but">
        <a href="${i.volumeInfo.previewLink}" class="read-btn">Read</a>
        </div>
      </div>
      `;
    list.appendChild(item);
  }
}

list.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.className === "bookmark-btn") {
    if (e.target.id) {
      fetch(url, options)
        .then((javob) => javob.json())
        .then((javob) => renderBookMarks(javob.items));
    }
  } else if (e.target.className === "info-btn") {
    modal.style.display = "block";
  }
  for (let g of bookArr) {
    console.log(g.volumeInfo.title);
    modal.innerHTML = `
<div class="modal-header">
<h2 class="modal-title">${g.volumeInfo.title}</h2>
<button onclick="closeModal()" class="close-modal-btn"></button>
</div>
<div class="modal-body">
<img class="modal-book-img" src="${g.volumeInfo.imageLinks.thumbnail}" alt="book img" />
<p class="book-description">${g.volumeInfo.description}</p>
<div class="modal-wrap"
<p class="modal-author">Authors: ${g.volumeInfo.authors}</p>
<p class="modal-published">Published : ${g.volumeInfo.publishedDate}</p>
<p class="modal-publishers">Publishers: ${g.volumeInfo.publisher}</p>
<p class="modal-categories">Categories: ${g.volumeInfo.categories}</p>
<p class="modal-pages">Pages Count: ${g.volumeInfo.pageCount}</p>
</div>
</div>




<a href="${g.volumeInfo.previewLink}" class="modal-btn">Read</a>
`;
  }
});
function closeModal() {
  modal.style.display = "none";
}

function renderBookMarks(data) {
  for (let j of data) {
    let savedBook = document.createElement("li");
    savedBook.className = "bookmark-item";
    savedBook.id = j.id;
    savedBook.innerHTML = `
          <div class="bookmark-text-wrap">
          <h5 class="bookmark-text-title">${j.volumeInfo.title}</h5>
          <p class="bookmark-text-author">${j.volumeInfo.authors}</p>
        </div>
        <div class="bookmark-btn-wrap">
          <button class="bookmark-btn-open"></button>
          <button class="bookmark-btn-delete"></button>
        </div>
          `;
    savedList.append(savedBook);
  }

  console.log(data);
}
