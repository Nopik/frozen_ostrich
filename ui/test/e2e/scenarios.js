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
			expect(productList.count()).toBe(3);
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
			expect(element(by.binding('product.description')).getText()).toBe('opis');
		});
	});

	describe('Product lifecycle', function(){
		it('should create product', function(){
			browser.get('index.html#/products');

			var oldProductListCount = element.all(by.repeater('product in products')).count();

			element(by.model('new_product.name')).sendKeys( 'test name' );
			element(by.model('new_product.code')).sendKeys( 'test-code' );
			element(by.model('new_product.inventory_count')).clear().sendKeys( '4242' );
			element(by.model('new_product.description')).sendKeys( 'Lorem ipsum' );

			element(by.css('#create-new-product')).click();

			var newProductListCount = element.all(by.repeater('product in products')).count();
			expect(newProductListCount).toBeGreaterThan( oldProductListCount );

			browser.get('index.html#/products/test-code');
			browser.getLocationAbsUrl().then(function(url) {
				expect(url.split('#')[1]).toBe('/products/test-code');
			});

			element(by.buttonText('Delete this product')).click();
			element(by.buttonText('Delete')).click();

			//We need for dialog to hide, Protractor cannot wait itself for it.
			browser.wait(function(){
				return browser.getLocationAbsUrl().then(function(url) {
					return url.split('#')[1] == '/products';
				});
			});

			var finalProductListCount = element.all(by.repeater('product in products')).count();
			expect(finalProductListCount).toBe( oldProductListCount );
		});
	});
});

