frozenOstrichServices = angular.module 'frozenOstrichServices', []

# Single product model. In normal project that would go to src/js/models/product.coffee
class Product
	constructor: (@$http, @code)->
		@isLoaded = false
		@isLoading = false

	deserialize: (object)->
		_.each [ 'name', 'description', 'inventory_count' ], (prop)=>
			@[ prop ] = object[ prop ]

		@isLoaded = true

	load: ->
		if (@isLoading == false) && (@isLoaded == false)
			@isLoading = true

			@$http.get( "api/v1/product/#{@code}/" ).success (data)=>
				@deserialize data
				@isLoading = false #not necessary, just for sake of completness
			.error =>
				#In a full project, error should be displayed here to the user

				@isLoading = false #Let allow retries in future

	update: (product, cb)->
		@$http
			method: "PATCH"
			url: "api/v1/product/#{@code}/"
			data: product
		.success (data)=>
			@deserialize data
			cb? true
		.error ->
			cb? false

# This class holds list of products, providing very important guarantee for whole application:
#
#   Each distinct product is represented by exactly one Javascript object in memory
#
# That allows perfect and effortless synchronization between various screens as well as minimization
# of AJAX requests.

# In normal project functionality of this class would be extracted to something more generic, to allow easy
# storage of various models.
class ProductsService
	constructor: (@$http)->
		@products = []
		@listLoading = false

	getProducts: ->
		@_loadList()

		@products

	_loadList: ->
		if @listLoading == false
			@listLoading = true

			@$http.get( "api/v1/product/" ).success (data)=>
				_.each data.objects, (object)=>
					@getProduct( object.code ).deserialize object

	# find product if it exists, otherwise create it
	getProduct: (code)->
		product = @findProduct code

		if !product?
			product = new Product( @$http, code )

			if @listLoading == false
				#if list is already loading, this product will get filled soon, no need to send second AJAX request
				#if list is not loading, it means, that we've arrived straight to products/:productCode route
				product.load()

			@products.push product #In real project some sorting could be applied here, too

		product

	# find product if it exists
	findProduct: (code)->
		_.findWhere @products, { code: code }

	createProduct: (new_product, cb)->
		@$http.post( "api/v1/product/", new_product ).success (data)=>
			@getProduct( data.code ).deserialize data

			cb? true
		.error ->
			cb? false

	destroyProduct: (product, cb)->
		@$http.delete("api/v1/product/#{product.code}/").success (data)=>
			#Easiest solution of $scope.products = _.filter(...) is bad - causes whole screens to re-render due to whole array change
			idx = @products.indexOf product

			if idx >= 0
				@products.splice idx, 1

			cb? true
		.error ->
			cb? false

frozenOstrichServices.factory 'ProductService', [ '$http', ($http)->
	new ProductsService( $http )
]
