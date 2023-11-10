const { nanoid } = require("nanoid");
const {
  addBook,
  getAllBooks,
  getBookById,
  editBook,
  deleteBook,
} = require("../models/eLibraryModel");
const { authors } = require("../data/eLibraryData.json");

const addBookHandler = async (request, h) => {
  try {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = readPage === pageCount;

    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);
    }

    const book = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    const addedBook = addBook(book);

    if (addedBook) {
      return h
        .response({
          status: "success",
          message: "Buku berhasil ditambahkan",
          data: {
            bookId: id,
          },
        })
        .code(201);
    } else {
      throw new Error("Failed to add book to the data store.");
    }
  } catch (error) {
    console.error("Error adding book:", error);
    return h
      .response({
        status: "fail",
        message: "Buku gagal ditambahkan",
      })
      .code(500);
  }
};

const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = [...getAllBooks()];

  if (name) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading === (reading === "1")
    );
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === (finished === "1")
    );
  }

  return {
    status: "success",
    data: {
      books: filteredBooks,
    },
  };
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = getBookById(bookId);

  if (book) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  return h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);
};

const editBookHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    authorId,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const book = getBookById(bookId);

  if (!book) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Buku tidak ditemukan",
      })
      .code(404);
  }

  const authorExists = authors.some((author) => author.id === authorId);

  if (!authorExists) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Author tidak ditemukan",
      })
      .code(404);
  }

  const updatedBook = editBook(
    bookId,
    name,
    year,
    authorId,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  );

  if (updatedBook) {
    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  }

  return h
    .response({
      status: "fail",
      message: "Gagal memperbarui buku",
    })
    .code(500);
};

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;
  const deleted = deleteBook(bookId);

  if (deleted) {
    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  }

  return h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Buku tidak ditemukan",
    })
    .code(404);
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookHandler,
  deleteBookHandler,
};
