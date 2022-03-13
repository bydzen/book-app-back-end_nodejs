// Import the ./handler.js and it's module
const {
  addBooksHandler,
  getAllBooksHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandler,
  getBooksByIdHandler,
} = require('./handler');

const routes = [
  // POST for add Books
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  // GET for retrieving Books
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  // GET by id for retrieving Books
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksByIdHandler,
  },
  // PUT for updating Books
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBooksByIdHandler,
  },
  // DELETE for deleting Books
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooksByIdHandler,
  },
  // ANY if beyond what already exists
  {
    method: '*',
    path: '/{any*}',
    handler: () => 'Tidak ditemukan',
  },
];

module.exports = routes;
