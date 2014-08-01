var frozenOstrichControllers = angular.module('frozenOstrichControllers', []);

frozenOstrichControllers.controller('ProductListCtrl', ['$scope', '$http',
  function($scope, $http) {
		$http.get( 'api/v1/product/' ).success( function( data ) {
			$scope.products = data.objects;
		});
  }
]);

frozenOstrichControllers.controller('ProductDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.productCode = $routeParams.productCode;
  }
]);

