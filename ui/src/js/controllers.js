var frozenOstrichApp = angular.module( 'frozenOstrichApp', [] );

frozenOstrichApp.controller( 'ProductListCtrl', function( $scope, $http ) {
	$http.get( 'api/v1/product/' ).success( function( data ) {
		$scope.products = data.objects;
	});
});

