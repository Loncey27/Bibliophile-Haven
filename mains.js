//--favorites storage

let favoritesList = JSON.parse(localStorage.getItem("favoriteBooks")) || [];

// Add book to favorites
function addToFavorites(book) {
    if (!favoritesList.some(fav => fav.title === book.title)) {
        favoritesList.push(book);
        localStorage.setItem("favoriteBooks", JSON.stringify(favoritesList));
        alert(`${book.title} added to favorites!`);
    } else {
        alert(`${book.title} is already in favorites.`);
    }
};

// Get favorite books
function getFavoriteBooks() {
    return JSON.parse(localStorage.getItem("favoriteBooks")) || [];
};

//remove favorite book
function removeFavoriteBook(encodedTitle) {
  const title = decodeURIComponent(encodedTitle);//removes whitespaces and decodes symbols
  let favorites = getFavoriteBooks();
  favorites = favorites.filter(book => book.title.trim().toLowerCase() !== title.trim().toLowerCase());

  localStorage.setItem("favoriteBooks", JSON.stringify(favorites));
  location.reload();
};

// persisting reading list
let readingList = JSON.parse(localStorage.getItem("readingList")) || [];

// Add book to reading list
function addToReadingList(book) {
    if (!readingList.some(item => item.title === book.title)) {
        readingList.push(book);
        localStorage.setItem("readingList", JSON.stringify(readingList));
        alert(`${book.title} added to reading list!`);
    } else {
        alert(`${book.title} is already in reading list.`);
    }
};

// Get reading list books
function getReadingList() {
    return JSON.parse(localStorage.getItem("readingList")) || [];
};

// Remove a book from the list
function removeReadingListBook(encodedTitle) {
  const title = decodeURIComponent(encodedTitle).trim().toLowerCase();
  let list = getReadingList();
  list = list.filter(book => book.title.trim().toLowerCase() !== title);

  localStorage.setItem("readingList", JSON.stringify(list));
  location.reload(); 
};

