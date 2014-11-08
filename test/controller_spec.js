'use strict';

describe('ToDoController', function () {
  beforeEach(function () {
    var controller,
        scope;

    module('todoApp.controllers');

    inject(function ($controller, $rootScope, $httpBackend, $injector) {
      controller = $controller;
      scope = this.scope = $rootScope.$new();
      this.todoBackend = $injector.get('ToDo');
      this.httpBackend = $httpBackend;
    });

    this.createController = function () {
      return controller('ToDoAppController', {
        $scope: scope
      });
    };
    this.ctrl = this.createController();
  });

  it('should have a todos array', function () {
    expect(this.ctrl.todoItems).toEqual([]);
  });

  describe('ctrl.addItem', function () {
    beforeEach(function () {
      this.item = {name: 'New To Do Item'};
      spyOn(this.todoBackend.prototype, '$save').and.callThrough();
      this.httpBackend.whenPOST(/todos\/api\?.*/)
        .respond(this.item);
    });

    it('should save to the ToDo service', function () {
      this.ctrl.addItem({name: 'New To Do Item'});
      expect(this.todoBackend.prototype.$save).toHaveBeenCalledWith(this.item, jasmine.any(Function));
    });

    it('should add a new item to todoItems', function () {
      expect(this.ctrl.todoItems.length).toBe(0);

      this.ctrl.addItem(this.item);
      this.httpBackend.flush();

      expect(this.ctrl.todoItems.length).toBe(1);
      expect(this.ctrl.todoItems[0].name).toBe(this.item.name);
    });
  });

  describe('ctrl.deleteItem', function () {
    it('should remove the item at the specified index', function () {
      var i = 0,
          todoItems = this.ctrl.todoItems,
          items = [{
        name: 'First Item'
      }, {
        name: 'Second Item'
      }, {
        name: 'Third Item'
      }, {
        name: 'Fourth Item'
      }];

      while (i <= 3) {
        todoItems.push(items[i]);
        i++;
      }

      expect(this.ctrl.todoItems).toEqual([items[0], items[1], items[2], items[3]]);

      this.ctrl.deleteItem(1);

      expect(this.ctrl.todoItems).toEqual([items[0], items[2], items[3]]);
    });
  });

  describe('ctrl.toggleComplete', function () {
    beforeEach(function () {
      this.ctrl.todoItems = [{
        name: 'Undone item',
        complete: false
      }, {
        name: 'Done item',
        complete: true
      }, {
        name: 'Second undone item',
        complete: false
      }];
    });

    it('should toggle the item state', function () {
      var toggleComplete = this.ctrl.toggleComplete;
      this.ctrl.todoItems.forEach(function (item) {
        toggleComplete(item);
      });
      expect(this.ctrl.todoItems[0].complete).toBeTruthy();
      expect(this.ctrl.todoItems[1].complete).toBeFalsy();
      expect(this.ctrl.todoItems[2].complete).toBeTruthy();

      // And back again
      this.ctrl.todoItems.forEach(function (item) {
        toggleComplete(item);
      });
      expect(this.ctrl.todoItems[0].complete).toBeFalsy();
      expect(this.ctrl.todoItems[1].complete).toBeTruthy();
      expect(this.ctrl.todoItems[2].complete).toBeFalsy();
    });

    it('should create a state if none exists', function () {
      this.ctrl.todoItems.push({name: 'No complete property'});
      var item = this.ctrl.todoItems[this.ctrl.todoItems.length - 1];
      expect(item.complete).toBeUndefined();
      this.ctrl.toggleComplete(item);
      expect(item.complete).toBeTruthy(); // undefined is falsy, and we invert the value of the property when this method is called
    });
  });
});
