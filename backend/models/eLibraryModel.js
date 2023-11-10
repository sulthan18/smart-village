const { nanoid } = require("nanoid");
const { books, authors } = require("./eLibraryData.json");

const addBook = (
  name,
  year,
  authorId,
  summary,
  publisher,
  pageCount,
  readPage,
  reading
) => {
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;

  const author = authors.find((author) => author.id === authorId);
  if (!author) {
    return null; // Pastikan penulis ada dalam data
  }

  const newBook = {
    id,
    name,
    year,
    authorId,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return newBook;
};

const getAllBooks = () => {
  return books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
};

const getBookById = (bookId) => {
  return books.find((book) => book.id === bookId);
};

const editBook = (
  bookId,
  name,
  year,
  authorId,
  summary,
  publisher,
  pageCount,
  readPage,
  reading
) => {
  const updatedAt = new Date().toISOString();
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    const finished = readPage === pageCount;

    const author = authors.find((author) => author.id === authorId);
    if (!author) {
      return null; // Pastikan penulis ada dalam data
    }

    books[bookIndex] = {
      ...books[bookIndex],
      id: bookId,
      name,
      year,
      authorId,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    return books[bookIndex];
  }
  return null;
};

const deleteBook = (bookId) => {
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    return true;
  }
  return false;
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  editBook,
  deleteBook,
};
