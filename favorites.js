document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favoritesContainer");
  const favorites = getFavoriteBooks();

  if (favorites.length === 0) {
    container.innerHTML = `
      <p class="text-center text-[#8c6642] text-lg font-medium mt-8">
        No favorite books yet.
      </p>
    `;
    return;
  }

  favorites.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card p-4 bg-white rounded shadow hover:shadow-lg transition duration-300 ease-in-out";

    // Encode title
    const encodedTitle = encodeURIComponent(book.title);

    card.innerHTML = `
      <div class="flex justify-end mb-2">
        <span class="text-[#8c6642] text-xl">
          <i class="fa-solid fa-heart"></i>
        </span>
      </div>
      <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-contain mb-4" />
      <h3 class="text-lg font-semibold mb-1">${book.title}</h3>
      <p class="text-sm text-gray-600 mb-1">${book.author}</p>
      <button
        class="border border-[#8c6642] text-[#8c6642] px-3 py-1 rounded hover:bg-[#8c6642] hover:text-white transition"
        data-title="${encodedTitle}"
        onclick="removeFavoriteBook(this.dataset.title)"
      >
        Remove
      </button>
    `;

    container.appendChild(card);
  });
});
