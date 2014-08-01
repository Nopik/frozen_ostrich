var frozenOstrichControllers = angular.module('frozenOstrichControllers', []);

frozenOstrichControllers.controller('ProductListCtrl', ['$scope', '$http',
  function($scope, $http) {
		$http.get( 'api/v1/product/' ).success( function( data ) {
			$scope.products = data.objects;
		});
  }
]);

frozenOstrichControllers.controller('ProductDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.productCode = $routeParams.productCode;

		// Django apparently loves the trailing slashes...
		$http.get( 'api/v1/product/' + $scope.productCode + '/' ).success( function( data ) {
			$scope.product = data;
		});
  }
]);

