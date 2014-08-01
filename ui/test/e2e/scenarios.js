describe('Frozen Ostrich App', function() {

  describe('Product list view', function() {

    beforeEach(function() {
      browser.get('index.html');
    });


    it('should filter the product list as user types into the search box', function() {

      var productList = element.all(by.repeater('product in products'));
      var query = element(by.model('query'));

      expect(productList.count()).toBe(4);

      query.sendKeys('1');
      expect(productList.count()).toBe(1);

      query.clear();
      query.sendKeys('2');
      expect(productList.count()).toBe(2);
    });
  });
});

