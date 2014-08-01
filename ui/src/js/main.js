var frozenOstrichApp = angular.module('frozenOstrichApp', [
  'ngRoute',
  'frozenOstrichControllers'
]);

frozenOstrichApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/products', {
        templateUrl: 'product-list.html',
        controller: 'ProductListCtrl'
      }).
      when('/products/:productCode', {
        templateUrl: 'product-detail.html',
        controller: 'ProductDetailCtrl'
      }).
      otherwise({
        redirectTo: '/products'
      });
  }
]);

