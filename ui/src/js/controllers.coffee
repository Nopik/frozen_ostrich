frozenOstrichControllers = angular.module "frozenOstrichControllers", []

frozenOstrichControllers.run ($rootScope, $http)->
	#One of controllers modified product list, lets notify others.
	#We need to use different event names to not trigger ourselves to death.
	$rootScope.$on "new_product_created", (event, args)->
		$rootScope.$broadcast "new_product", args

	$rootScope.$on "product_deleted", (event, args)->
		$rootScope.$broadcast "destroy_product", args

frozenOstrichControllers.controller "ProductListCtrl", [ "$scope", "$http", ($scope, $http)->
	$http.get( "api/v1/product/" ).success (data)->
		$scope.products = data.objects

	$scope.$on "new_product", (event, new_product)->
		$scope.products.push new_product

	$scope.$on "destroy_product", (event, code)->
		#Easiest solution of $scope.products = _.filter(...) is bad - causes whole screens to re-render due to whole array change
		product = _.findWhere $scope.products, { code: code }
		idx = $scope.products.indexOf product
		if idx >= 0
			$scope.products.splice idx, 1
]

frozenOstrichControllers.controller "ProductDetailCtrl", [ "$scope", "$routeParams", "$http", "$location", ($scope, $routeParams, $http, $location)->
	hideDialog = ->
		$("#delete-product-dialog").modal "hide"

	$scope.productCode = $routeParams.productCode

	# Django apparently loves the trailing slashes...
	$http.get( "api/v1/product/#{$scope.productCode}/" ).success (data)->
		$scope.product = data

	$scope.deleteProduct = ->
		#Dialog needs time to be hidden, we cannot redirect immediately - we'll leave dialog partially destroyed
		$http.delete1("api/v1/product/#{$scope.productCode}/").success (data)->
			$("#delete-product-dialog").on "hidden.bs.modal", ->
				$scope.$emit "product_deleted", $scope.productCode
				$location.path "/products"
				$scope.$apply()

			hideDialog()
		.error ->
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
		$http
			method: "PATCH"
			url: "api/v1/product/#{$scope.productCode}/"
			data: product
		.success (data)->
			$scope.editMode = false
		.error ->
]

frozenOstrichControllers.controller "NewProductCtrl", [ "$scope", "$http", ($scope, $http)->
	$scope.resetNewProduct = ->
		$scope.new_product =
			name: ""
			code: ""
			description: ""
			inventory_count: 0

	$scope.createNewProduct = (new_product)->
		#Sent notification to root scope, so it can broadcast to everybody
		$http.post( "api/v1/product/", new_product ).success (data)->
			$scope.$emit "new_product_created", data
			$scope.resetNewProduct()
		.error ->

	$scope.resetNewProduct()
]
