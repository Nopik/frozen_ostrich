frozenOstrichControllers = angular.module "frozenOstrichControllers", []

frozenOstrichControllers.controller "ProductListCtrl", [ "$scope", "$http", "ProductService", ($scope, $http, ProductService)->
	$scope.products = ProductService.getProducts()
]

frozenOstrichControllers.controller "ProductDetailCtrl", [ "$scope", "$routeParams", "$http", "$location", "ProductService", ($scope, $routeParams, $http, $location, ProductService)->
	hideDialog = ->
		$("#delete-product-dialog").modal "hide"

	$scope.productCode = $routeParams.productCode

	$scope.product = ProductService.getProduct $scope.productCode

	$scope.deleteProduct = ->
		ProductService.destroyProduct $scope.product, (success)->
			# In normal project error message would be displayed upon failure
			if success == true
				#Dialog needs time to be hidden, we cannot redirect immediately - we'll leave dialog partially destroyed
				$( "#delete-product-dialog" ).on "hidden.bs.modal", ->
					$location.path "/products"
					$scope.$apply()

				#Hide dialog only upon success, in case of failure let user retry easily
				hideDialog()
]

frozenOstrichControllers.controller "ProductEditCtrl", [ "$scope", "$http", ($scope, $http)->
	$scope.editMode = false

	$scope.editProduct = ->
		$scope.editMode = true
		$scope.edited_product = angular.copy $scope.product

	$scope.cancelEdit = ->
		$scope.editMode = false

	$scope.updateProduct = (product)->
		$scope.product.update product, (success)->
			# In normal project error message would be displayed upon failure
			$scope.editMode = false
]

frozenOstrichControllers.controller "NewProductCtrl", [ "$scope", "$http", "ProductService", ($scope, $http, ProductService)->
	$scope.resetNewProduct = ->
		$scope.new_product =
			name: ""
			code: ""
			description: ""
			inventory_count: 0

	$scope.createNewProduct = (new_product)->
		ProductService.createProduct new_product, (success)->
			# In normal project error message would be displayed upon failure
			$scope.resetNewProduct()

	$scope.resetNewProduct()
]
