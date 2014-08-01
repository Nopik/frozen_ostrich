describe('ProductListCtrl', function(){
	var scope, ctrl, $httpBackend;

  beforeEach(module('frozenOstrichApp'));

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

