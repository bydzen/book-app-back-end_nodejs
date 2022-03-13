/* eslint-disable max-len */
// Import nanoid
const {nanoid} = require('nanoid');
// Import ./books.js
const books = require('./books');

// Handler for POST Books
const addBooksHandler = (request, h) => {
  // Retrieve payload
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

  // If not put name object on JSON body
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
    // If put the name object but empty or ""
  } else if (Object.keys(name).length === 0) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Generate 10 digit unique id
  const id = nanoid(10);
  // New created and inserted date
  const insertedAt = new Date().toISOString();
  // Because new, the inserted date is the same with update date
  const updatedAt = insertedAt;

  // Number of pageCount inserted
  const pageCountNum = Number(pageCount);
  // Number of readPage inserted
  const readPageNum = Number(readPage);

  // Condition if pageCountNum same with readPageNum then return true else false
  const finished = pageCountNum === readPageNum ? true : false;

  // New Book object
  const newBook = {
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

  // If the pageCount is less then readPage (impossible) then fail
  if (pageCountNum < readPageNum) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // If passed condition above then push Book object
  books.push(newBook);

  // To get responses given by server
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // If succeed, then success
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  // If not, then error
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(400);
  return response;
};

// Handler for GET all Books
const getAllBooksHandler = (request, h) => {
  // Request query for name, reading, and finished Book
  const {name, reading, finished} = request.query;

  // If no query then response with normal GET
  if (!name && !reading && !finished) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  // If there is query parameter name, then check
  if (name) {
    const qpName = books.filter((book) => {
      // Regex gi: global (g), and insensitive or case insensitive match (i)
      const nameRegex = new RegExp(name, 'gi');
      return nameRegex.test(book.name);
    });
    // Then, response with success and map the Book name
    const response = h.response({
      status: 'success',
      data: {
        books: qpName.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  // If there is query parameter reading, then check
  if (reading) {
    const qpReading = books.filter(
        // Get the Book reading for number or integer
        (book) => Number(book.reading) === Number(reading),
    );
    // Then, response with success and map the reading Book
    const response = h.response({
      status: 'success',
      data: {
        books: qpReading.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  // If there is query parameter finished, then check
  if (finished) {
    const qpFinished = books.filter(
        // Get the finished Book for number or integer
        (book) => Number(book.finished) === Number(finished),
    );
    // Then response with success and map finished Book
    const response = h.response({
      status: 'success',
      data: {
        books: qpFinished.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
};

// Handler for getting Books by id
const getBooksByIdHandler = (request, h) => {
  // Request the parameter id
  const {id} = request.params;

  // Retrieving Book object from array Books
  const book = books.filter((n) => n.id === id)[0];

  // If not undefined then return success
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  // Else, return fail 404
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Handler for edit Books by id
const editBooksByIdHandler = (request, h) => {
  // Request the parameter id
  const {id} = request.params;

  // Request the payload
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

  // Check if the name is not given in payload or undefined, then return fail
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
    // Check if the name is given in payload but with empty value or "", then return fail
  } else if (Object.keys(name).length === 0) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Number of pageCount inserted
  const pageCountNum = Number(pageCount);
  // Number of readPage inserted
  const readPageNum = Number(readPage);

  // Condition if pageCountNum same with readPageNum then return true else false
  const finished = pageCountNum === readPageNum ? true : false;

  // If the pageCount is less then readPage (impossible) then fail
  if (pageCountNum < readPageNum) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
    // Else, update with payload given above
  } else {
    // Set the new updated date
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);

    // If found, then do update
    if (index !== -1) {
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        updatedAt,
      };
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
  }
  // Else, if returned -1 or not found, then fail
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Handler for delete Books by id
const deleteBooksByIdHandler = (request, h) => {
  // Request of parameter id
  const {id} = request.params;

  const index = books.findIndex((book) => book.id === id);

  // If found, then do the deletion
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // Else, response with fail 404
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Export all module
module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandler,
};
