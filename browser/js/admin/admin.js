app.config(function($stateProvider){
	$stateProvider.state('editpage', {
		url: '/editpage/:theID',
		controller: 'AdminController',
		templateUrl: 'js/admin/adminEdit.html',
		data: {authenticate: true}
	});
});

app.factory('AdminFactory', function($http) {
	return {
		editProduct: function(currentMedEdit) {
			return $http.post('/api/admin/editpage', currentMedEdit).
				success(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				}).
				error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});
		},
		deleteProduct: function(curentMedDelete) {
			return $http.delete('/api/admin/deletepage', curentMedDelete).
			success(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				}).
				error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});
		}
	};
});

app.controller('AdminController', function($scope, AdminFactory, $stateParams, productsFactory, $state) {

	productsFactory.getAllProducts().then(function(productsArray){
		// console.log("prodArr", productsArray);
		$scope.products = productsArray;

		$scope.products.forEach(function(aProd) {
			if(aProd._id === $stateParams.theID) {
				$scope.currentMed = aProd;
			}
		});	

		$scope.submitEdit = function(){
			AdminFactory.editProduct($scope.currentMed);
			$state.go("products");
		};

		$scope.deleteMed = function(){
			AdminFactory.deleteProduct($scope.currentMed);
			console.log("delete me", $scope.currentMed);
			$state.go("products");
		};
	});


});