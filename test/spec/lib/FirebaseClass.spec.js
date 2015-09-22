'use strict';

var _ = require('lodash');
var nock = require('nock');

describe('FirebaseClass', function() {
  var FirebaseClass;
  var Book, Author, Editor;

  // load the original collections once
  var _bookCollection_ = require('./../../mock/collection/bookCollection.mock');
  var _authorCollection_ = require('./../../mock/collection/authorCollection.mock');
  var _editorCollection_ = require('./../../mock/collection/editorCollection.mock');

  var _config_ = {
    url: 'https://kazak-woof.firebaseio.com',
    secret: 'partyhard'
  };

  var defaultQuery = {
    auth: _config_.secret
  };

  var bookCollection, authorCollection, editorCollection;

  var nockCollection = function(collection, endpoint) {
    nock(_config_.url)
      .persist()
      .get('/' + endpoint + '.json')
      .query(defaultQuery)
      .reply(200, collection);
  };

  var nookCollectionElems = function(collection, endpoint) {
    Object.keys(collection).forEach(function(element) {
      nockCollection(collection[element], endpoint + '/' + element);
    });
  };

  var getRichBook = function(id) {
    var author = authorCollection[bookCollection[id].author];
    var editor = editorCollection[bookCollection[id].editor];
    return {
      id: id,
      title: bookCollection[id].title,
      pages: bookCollection[id].pages,
      author: {
        id: bookCollection[id].author,
        name: author.name
      },
      editor: {
        id: bookCollection[id].editor,
        name: editor.name
      }
    };
  };

  beforeEach(function() {
    FirebaseClass = require('./../../../lib/FirebaseClass');
    Book = require('./../../mock/model/Book.mock');
    Author = require('./../../mock/model/Author.mock');
    Editor = require('./../../mock/model/Editor.mock');
  });

  beforeEach(function() {
    // we want to achieve idempotence between tests: clone them all
    bookCollection = _.cloneDeep(_bookCollection_);
    authorCollection = _.cloneDeep(_authorCollection_);
    editorCollection = _.cloneDeep(_editorCollection_);
  });

  afterEach(function() {
    nock.cleanAll();
  });

  it('should be defined', function() {
    expect(typeof(FirebaseClass)).toEqual('function');
  });

  it('should create all mock classes', function() {
    expect(typeof(Book)).toEqual('function');
    expect(typeof(Author)).toEqual('function');
    expect(typeof(Editor)).toEqual('function');
  });

  describe('toList', function() {

    it('should transform a map of books into a list', function() {
      var map = {
        'book-1': {one: 1},
        'book-2': {two: ['arr', 'ays']},
        'book-3': {some: 'string'}
      };

      var books = Book.toList(map);

      expect(books).toEqual([
        {id: 'book-1', one: 1},
        {id: 'book-2', two: ['arr', 'ays']},
        {id: 'book-3', some: 'string'}
      ]);
    });

    it('should transform an undefined object into an empty array', function() {
      expect(Book.toList(undefined)).toEqual([]);
    });

    it('should transform an empty object into an empty array', function() {
      expect(Book.toList({})).toEqual([]);
    });

  });

  describe('get', function() {
    var editor = 'harper-collins';

    beforeEach(function() {
      nockCollection(editorCollection[editor], 'editors/' + editor);
      nookCollectionElems(bookCollection, 'books');
      nookCollectionElems(authorCollection, 'authors');
    });

    it('should fetch a single element with full expansion (default)', function(done) {
      return Editor.get(_config_, editor)
        .then(function(element) {
          var books = [];
          Object.keys(editorCollection[editor].books).forEach(function(book) {
            books.push({
              id: book,
              title: bookCollection[book].title,
              pages: bookCollection[book].pages
            });
          });
          var fullEditor = {
            id: editor,
            name: editorCollection[editor].name,
            books: books
          };
          expect(element).toEqual(fullEditor);
          done();
        });
    });

    it('should fetch a single element and explicitly avoid expansion', function(done) {
      return Editor.get(_config_, editor, {})
        .then(function(element) {
          var simpleEditor = {
            id: editor,
            name: editorCollection[editor].name
          };
          expect(element).toEqual(simpleEditor);
          done();
        });
    });

    it('should fetch a single element and expand recursively', function(done) {
      return Editor.get(_config_, editor, {
        books: {
          author: true
        }
      }).then(function(element) {
        var booksWithAuthor = [];
        Object.keys(editorCollection[editor].books).forEach(function(book) {
          booksWithAuthor.push({
            id: book,
            title: bookCollection[book].title,
            pages: bookCollection[book].pages,
            author: {
              id: bookCollection[book].author,
              name: authorCollection[bookCollection[book].author].name
            }
          });
        });
        var recursiveEditor = {
          id: editor,
          name: editorCollection[editor].name,
          books: booksWithAuthor
        };
        expect(element).toEqual(recursiveEditor);
        done();
      });
    });

  });

  describe('getAll', function() {

    beforeEach(function() {
      nockCollection(bookCollection, 'books');
      nookCollectionElems(authorCollection, 'authors');
      nookCollectionElems(editorCollection, 'editors');
    });

    it('should fetch all elements with no expansions', function(done) {
      return Book.getAll(_config_)
        .then(function(books) {
          var simpleBooks = [];
          Object.keys(bookCollection).map(function(id) {
            simpleBooks.push({
              id: id,
              title: bookCollection[id].title,
              pages: bookCollection[id].pages
            });
          });
          expect(books).toEqual(simpleBooks);
          done();
        });
    });

    it('should fetch all elements and expand all of the expandables', function(done) {
      return Book.getAll(_config_, {
        author: true,
        editor: true
      }).then(function(books) {
        var richBooks = [];
        Object.keys(bookCollection).map(function(id) {
          richBooks.push(getRichBook(id));
        });
        expect(books).toEqual(richBooks);
        done();
      });
    });

  });

  describe('put', function() {
    var newBookId = 'legend-sigurd-gudrun';
    var newBook = {
      'title': 'The Legend of Sigurd and Gudrún',
      'pages': '385',
      'author': 'jrr-tolkien',
      'editor': 'harper-collins'
    };

    beforeEach(function() {
      nock(_config_.url)
        .put('/books/' + newBookId + '.json', newBook)
        .query(defaultQuery)
        .reply(200, function() {
          // add the new element to the collection
          bookCollection[newBookId] = newBook;
          return newBook;
        });

      nookCollectionElems(authorCollection, 'authors');
      nookCollectionElems(editorCollection, 'editors');
    });

    it('should put a new object in the collection and return it with the new connections expanded',
      function(done) {
        return Book.put(_config_, newBookId, newBook)
          .then(function(element) {
            var richBook = getRichBook(newBookId);
            expect(element).toEqual(richBook);
            done();
          });
      });

  });

  describe('patch', function() {
    var editBookId = 'i-kill';
    var editBook = {
      'pages': 580
    };

    beforeEach(function() {
      nock(_config_.url)
        .patch('/books/' + editBookId + '.json', editBook)
        .query(defaultQuery)
        .reply(200, function() {
          // add the new element to the collection
          bookCollection[editBookId].pages = editBook.pages;
          return bookCollection[editBookId];
        });

      nookCollectionElems(authorCollection, 'authors');
      nookCollectionElems(editorCollection, 'editors');
    });

    it('should patch an existing object in the collection and expand all connections',
      function(done) {
        return Book.patch(_config_, editBookId, editBook)
          .then(function(element) {
            var richBook = getRichBook(editBookId);
            expect(element).toEqual(richBook);
            expect(element.pages).toEqual(editBook.pages);
            done();
          });
      });
  });

  describe('delete', function() {
    var deleteBookId = 'i-kill';

    beforeEach(function() {
      nock(_config_.url)
        .delete('/books/' + deleteBookId + '.json')
        .query(defaultQuery)
        .reply(200, undefined);
    });

    it('should delete an existing object and return undefined', function(done) {
      return Book.delete(_config_, deleteBookId)
        .then(function(result) {
          expect(result).toBeUndefined();
          done();
        })
    });
  });

});
