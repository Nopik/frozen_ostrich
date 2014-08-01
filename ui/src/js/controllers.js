var frozenOstrichControllers = angular.module('frozenOstrichControllers', []);

frozenOstrichControllers.run(function($rootScope){
	//One of controllers modified product list, lets notify others.
	//We need to use different event names to not trigger ourselves to death.

	$rootScope.$on( 'new_product_created', function( event, args ){
		$rootScope.$broadcast( 'new_product', args );
	});

	$rootScope.$on( 'product_deleted', function( event, args ){
		$rootScope.$broadcast( 'destroy_product', args );
	});
});

frozenOstrichControllers.controller('ProductListCtrl', ['$scope', '$http',
  function($scope, $http) {
		$http.get( 'api/v1/product/' ).success( function( data ) {
			$scope.products = data.objects;
		});

		$scope.$on( 'new_product', function( event, new_product ){
			$scope.products.push( new_product );
		});

		$scope.$on( 'destroy_product', function( event, code ){
			//Easiest solution of $scope.products = _.filter(...) is bad - causes whole screens to re-render due to whole array change

			var product = _.findWhere( $scope.products, { code: code } );
			var idx = $scope.products.indexOf( product );
			$scope.products.splice( idx, 1 );
		});
  }
]);

frozenOstrichControllers.controller('ProductDetailCtrl', ['$scope', '$routeParams', '$http', '$location',
  function($scope, $routeParams, $http, $location) {
    $scope.productCode = $routeParams.productCode;

		// Django apparently loves the trailing slashes...
		$http.get( 'api/v1/product/' + $scope.productCode + '/' ).success( function( data ) {
			$scope.product = data;
		});

		function hideDialog(){
			$('#delete-product-dialog').modal('hide');
		};

		$scope.deleteProduct = function(){
			$http.delete( 'api/v1/product/' + $scope.productCode + '/' ).success( function( data ) {
				//Dialog needs time to be hidden, we cannot redirect immediately - we'll leave dialog partially destroyed
				$("#delete-product-dialog").on('hidden.bs.modal', function(){
					$scope.$emit('product_deleted', $scope.productCode);
					$location.path("/products");
					$scope.$apply();
				});
				hideDialog();
			})
			.error(function(){
				hideDialog();
			});
		};
  }
]);

frozenOstrichControllers.controller('NewProductCtrl', ['$scope', '$http',
  function($scope, $http) {
		$scope.resetNewProduct = function(){
			$scope.new_product = {
				name: '',
				code: '',
				description: '',
				inventory_count: 0
			};
		};

		$scope.createNewProduct = function( new_product ){
			//Sent notification to root scope, so it can broadcast to everybody
			$http.post( 'api/v1/product/', new_product )
			.success( function( data ) {
				$scope.$emit('new_product_created', data);
				$scope.resetNewProduct();
			})
			.error(function(){
			});
		};

		$scope.resetNewProduct();
  }
]);

