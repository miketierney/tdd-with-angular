'use strict';

angular.module('todoApp.controllers', ['todoApp.services'])
  .controller('ToDoAppController', function ($scope, ToDo) {
    var ctrl = this;

    this.todoItems = [];

    this.addItem = function (newItem) {
      var item = new ToDo();
      item.$save(newItem, function () {
        ctrl.todoItems.push(item);
      });
    };

    this.deleteItem = function (index) {
      ctrl.todoItems.splice(index, 1);
    };

    this.toggleComplete = function (item) {
      item.complete = !item.complete;
    };
  });

angular.module('todoApp.services', ['ngResource'])
  .factory('ToDo', function ($resource) {
    return $resource('/todos/api/:id');
  });

angular.module('todoApp', ['todoApp.controllers']);

