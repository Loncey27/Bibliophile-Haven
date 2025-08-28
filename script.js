window.books = [];

async function fetchBooks() {
    try {
        const response = await fetch("https://mocki.io/v1/f7f58756-d3d1-475a-9b41-00a4616ae2b1");
        if (!response.ok) throw new Error("Error fetching books data");
        window.books = await response.json();
        renderBooks(window.books);
    } catch (error) {
        console.error("Error retrieving books!", error);
    }
}
fetchBooks();

function renderBooks(bookList) {
    const booksContainer = document.getElementById("booksContainer");
    booksContainer.innerHTML = "";

    bookList.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add(
            "w-full", "max-w-xs", "bg-white", "rounded-lg", "shadow-md", "p-4",
            "text-[#8c6642]", "transition", "hover:shadow-xl"
        );

        bookCard.innerHTML = `
            <div class="flex justify-end">
                <span class="fav-button text-gray-400 hover:text-red-400 cursor-pointer">
                    <i class="fa-solid fa-heart"></i>
                </span>
            </div>
            <img class="w-full h-48 object-contain mb-4" src="${book.cover}" alt="book cover">
            <h3 class="text-lg font-semibold mb-1">${book.title}</h3>
            <p class="text-sm text-gray-600 mb-1">${book.author}</p>
            <p class="text-sm text-gray-500 mb-3">${book.genre}</p>
            <div class="flex items-center justify-between">
                <button class="read-button border border-[#8c6642] text-[#8c6642] px-3 py-1 rounded hover:bg-[#8c6642] hover:text-white transition">Read</button>
                <button class="details-btn bg-gray-500 text-white px-3 py-1 rounded hover:bg-[#8c6642] hover:text-white transition">Details</button>
            </div>
        `;

        bookCard.querySelector(".details-btn").addEventListener("click", () => openBookModal(book));
        bookCard.querySelector(".fav-button").addEventListener("click", function () {
            addToFavorites(book);
            this.classList.toggle("text-red-600");
            this.classList.toggle("text-gray-400");
        });
        bookCard.querySelector(".read-button").addEventListener("click", () => addToReadingList(book));

        booksContainer.appendChild(bookCard);
    });
}

function openBookModal(book) {
    const modalContainer = document.getElementById("modal");
    modalContainer.innerHTML = `
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div class="bg-white w-[600px] max-h-[80vh] overflow-y-auto rounded-lg shadow-lg relative p-6">
                <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold" onclick="closeModal()">×</button>
                <h2 class="text-2xl font-bold mb-2">${book.title}</h2>
                <p class="text-gray-700 mb-1"><strong>Author:</strong> ${book.author}</p>
                <p class="text-gray-700 mb-3"><strong>Genre:</strong> ${book.genre}</p>
                <p class="text-gray-600 leading-relaxed">${book.description}</p>
            </div>
        </div>
    `;
    modalContainer.classList.remove("hidden");
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
    modal.innerHTML = "";
}

// Filter logic
function applyFilters() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const selectedAuthor = document.getElementById("authorFilter").value;
    const selectedGenre = document.getElementById("genreFilter").value;

    const filtered = window.books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchInput) ||
            book.author.toLowerCase().includes(searchInput) ||
            book.genre.toLowerCase().includes(searchInput);

        const matchesAuthor = selectedAuthor === "-" || book.author === selectedAuthor;
        const matchesGenre = selectedGenre === "" || book.genre === selectedGenre;

        return matchesSearch && matchesAuthor && matchesGenre;
    });

    const booksContainer = document.getElementById("booksContainer");
    if (filtered.length === 0) {
        booksContainer.innerHTML = "<p>No item matches your search</p>";
    } else {
        renderBooks(filtered);
    }
}

// Event listeners
document.getElementById("authorFilter").addEventListener("change", applyFilters);
document.getElementById("genreFilter").addEventListener("change", applyFilters);
document.getElementById("search").addEventListener("input", applyFilters);
