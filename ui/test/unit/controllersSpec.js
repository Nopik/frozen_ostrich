describe('Frozen Ostrich App', function(){
	beforeEach(module('frozenOstrichApp'));

	describe('ProductListCtrl', function(){
		var scope, ctrl, $httpBackend;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('api/v1/product/').respond({objects:[{},{},{},{}]});

			scope = $rootScope.$new();
			ctrl = $controller('ProductListCtrl', {$scope: scope});
		}));

		it('should create "products" model with 4 products', inject(function($controller) {
				expect(scope.products).toBeUndefined();
				$httpBackend.flush();
				expect(scope.products.length).toEqual( 4 );
		}));
	});

	describe('ProductDetailCtrl', function(){
		var scope, ctrl, $httpBackend;
		var dummyName = "First Product";

		beforeEach(module('frozenOstrichApp'));

		beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('api/v1/product/first-product/').respond({name: dummyName});

			$routeParams.productCode = 'first-product';
			scope = $rootScope.$new();
			ctrl = $controller('ProductDetailCtrl', {$scope: scope});
		}));

		it('should fetch "product" details', inject(function($controller) {
				expect(scope.product).toBeUndefined();
				$httpBackend.flush();
				expect(scope.product.name).toEqual( dummyName );
		}));
	});
});

