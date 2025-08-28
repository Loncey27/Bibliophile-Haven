
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("readingListContainer");
  const readingList = getReadingList();

  if (readingList.length === 0) {
    container.innerHTML = `
      <p class="text-center text-[#8c6642] text-lg font-medium mt-8">
        No books in your reading list yet.
      </p>
    `;
    return;
  }

  readingList.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card p-4 bg-white rounded shadow hover:shadow-lg transition duration-300 ease-in-out";

    card.innerHTML = `
      <div class="flex justify-end mb-2">
        <span class="text-[#8c6642] text-xl">
          <i class="fa-solid fa-book-open"></i>
        </span>
      </div>
      <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-contain mb-4" />
      <h3 class="text-lg font-semibold mb-1">${book.title}</h3>
      <p class="text-sm text-gray-600 mb-1">${book.author}</p>
      <button
      class="border border-[#8c6642] text-[#8c6642] px-3 py-1 rounded hover:bg-[#8c6642] hover:text-white transition"
      data-title="${encodeURIComponent(book.title)}" onclick="removeReadingListBook(this.dataset.title)"> Remove </button>
    `;

    container.appendChild(card);
  });
});
