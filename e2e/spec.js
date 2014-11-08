describe('homepage', function() {
  it('should have a title', function() {
    browser.get('http://localhost:8000/index.html');
    expect(browser.getTitle()).toEqual('ToDo TDD');
  });
});
