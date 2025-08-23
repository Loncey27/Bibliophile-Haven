
async function fetchBooks() {
    try {
        const booksContainer = document.getElementById('booksContainer');

        const response = await fetch("https://mocki.io/v1/68769731-75d0-4f1c-b75b-183c261693bc");
        if (!response.ok) {
            throw new Error("Error fetching books data");
        }
        const books = await response.json();
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('w-64', 'text-[#8c6642]', 'outline', 'outline-1', 'bg-white', 'm-2')
            bookCard.innerHTML = `
            <img class="w-64 mx-auto h-72 object-contain mt-2 rounded" src="${book.cover}" alt="book cover">
            <p class="px-4 mx-4">${book.title}</p>
            <p class="px-4 mx-4">${book.author}</p>
            <p class="px-4 mx-4">${book.genre}</p>
            <div class="mx-4 px-4 py-3 flex nowrap space-x-10">
                <button class="bg-gray-500 text-white rounded mt-2 px-2 py-1 hover:bg-[#8c6642] text-black">Borrow</button>
                <button class="bg-gray-500 text-white rounded mt-2 px-2 py-1 hover:bg-[#8c6642] text-black">Details</button>
            </div>
            `
            booksContainer.appendChild(bookCard);
        });


    } catch (error) {
        console.log('Error retrieving book!');

    }
};
fetchBooks();