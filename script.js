let books = [];
async function fetchBooks() {
    try {
        const response = await fetch("https://mocki.io/v1/68769731-75d0-4f1c-b75b-183c261693bc");
        if (!response.ok) {
            throw new Error("Error fetching books data");
        }
        books = await response.json();
        renderBooks(books);

    } catch (error) {
        console.log('Error retrieving books!');

    };
};
fetchBooks();//fetch books array

//render books function
function renderBooks(bookList) {
    const booksContainer = document.getElementById('booksContainer');
    booksContainer.innerHTML = "";
    bookList.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('w-64', 'text-[#8c6642]', 'outline', 'outline-1', 'bg-white', 'm-2')
        bookCard.innerHTML = `
                <img class="w-64 mx-auto h-72 object-contain mt-2 rounded" src="${book.cover}" alt="book cover">
                <p class="px-4 mx-4">${book.title}</p>
                <p class="px-4 mx-4">${book.author}</p>
                <p class="px-4 mx-4">${book.genre}</p>
                <div class="mx-4 px-4 py-3 flex nowrap space-x-4 items-center justify-center">
                    <button class="bg-gray-500 text-white rounded mt-2 px-1 py-1 hover:bg-[#8c6642] text-black">Borrow</button>
                    <button class="bg-gray-500 text-white rounded mt-2 px-1 py-1 hover:bg-[#8c6642] text-black">Details</button>
                    <span class="text-red-600 p-1 mt-4 "><i class="fa-solid fa-heart"></i></span>
                </div>
            `
        booksContainer.appendChild(bookCard);
    });
}

//add the filter functions
function filterByAuthor() {
    const author = document.getElementById('authorFilter').value;
    if (author === "Karla Hocker") {
        renderBooks(books.filter((book) => book.author === "Karla Hocker"));
    } else if (author === "Frank Herbert") {
        renderBooks(books.filter((book) => book.author === "Frank Herbert"));
    } else if (author === "Isaac Asimov") {
        renderBooks(books.filter((book) => book.author === "Isaac Asimov"));
    } else if (author === "Jane Austen") {
        renderBooks(books.filter((book) => book.author === "Jane Austen"));
    } else {
        renderBooks(books);
    };
};
//add filter event listerner
const authorFilterElement = document.getElementById('authorFilter');
authorFilterElement.addEventListener('change', filterByAuthor);

//filter by genre
function filterByGenre() {
    const genre = document.getElementById('genreFilter').value;
    if (genre === "Romance") {
        renderBooks(books.filter((book) => book.genre === "Romance"));
    } else if (genre === "Sci-Fi") {
        renderBooks(books.filter((book) => book.genre === "Sci-Fi"));
    } else {
        renderBooks(books);
    };
};
//add event listener
const genreFilterElement = document.getElementById('genreFilter');
genreFilterElement.addEventListener('change', filterByGenre);

//search function
function searchBooks() {
    let searchInput = document.getElementById('search').value.toLowerCase();
    const filtered = books.filter(book => {
        return (
            book.title.toLowerCase().includes(searchInput) ||
            book.author.toLowerCase().includes(searchInput) ||
            book.genre.toLowerCase().includes(searchInput)
        );
    });
    if (filtered.length === 0) {
        const booksContainer = document.getElementById('booksContainer');
        booksContainer.innerHTML = "<p>No items match your search</p>";
    } else {
        renderBooks(filtered);
    }
};
//search event listener
document.getElementById('search').addEventListener('input', searchBooks);

