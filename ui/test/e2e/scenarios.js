describe('Frozen Ostrich App', function() {

  it('should redirect index.html to index.html#/products', function() {
    browser.get('index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/products');
      });
  });

  describe('Product list view', function() {

    beforeEach(function() {
      browser.get('index.html#/products');
    });


    it('should filter the product list as user types into the search box', function() {

      var productList = element.all(by.repeater('product in products'));
      var query = element(by.model('query'));

      expect(productList.count()).toBeGreaterThan(1);

      query.sendKeys('7');
      expect(productList.count()).toBe(1);

      query.clear();
      query.sendKeys('1');
      expect(productList.count()).toBe(2);
    });

		it('should render product specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('7');
      element(by.css('.products li a')).click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/products/dummy');
      });
    });
  });

	describe('Product detail view', function() {

    beforeEach(function() {
      browser.get('index.html#/products/shell1');
    });


    it('should display placeholder page with productCode', function() {
      expect(element(by.binding('productCode')).getText()).toBe('shell1');
    });
  });
});

