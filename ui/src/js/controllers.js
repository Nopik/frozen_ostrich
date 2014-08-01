var frozenOstrichApp = angular.module( 'frozenOstrichApp', [] );

frozenOstrichApp.controller( 'ProductListCtrl', function( $scope ) {
	$scope.products = [
		{ code: 'c1', name: 'n1', description: 'd1', inventory_count: 1 },
		{ code: 'c2', name: 'n2', description: 'd2', inventory_count: 2 },
		{ code: 'c3', name: 'n3', description: 'd3', inventory_count: 3 }
	];
});

