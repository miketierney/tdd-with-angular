'use strict';

describe('ToDoService', function () {
  beforeEach(function () {
    module('todoApp.services');

    inject(function ($httpBackend, $injector) {
      this.todo = $injector.get('ToDo');
      this.httpBackend = $httpBackend;
    });
  });

  it('should have CRUD class methods', function () {
    expect(this.todo.get).toBeDefined(); // for individual item
    expect(this.todo.query).toBeDefined(); // for all items
    expect(this.todo.save).toBeDefined(); // create
  });

  it('should have CRUD instance methods', function () {
    var todo = new this.todo();

    expect(todo.$save).toBeDefined(); // update
    expect(todo.$delete).toBeDefined(); // delete
    expect(todo.$remove).toBeDefined(); // alias for delete
  });

  it('should query from /todos/api', function () {
    this.httpBackend.expectGET('/todos/api')
      .respond([]);
    this.todo.query();
    this.httpBackend.flush();
  });
});
