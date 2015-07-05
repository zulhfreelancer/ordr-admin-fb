var app = angular.module('app', ["firebase", "ngRoute"]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/add-drink', {
            templateUrl: '_add_drink.html',
            controller: 'addDrink'
        }).
        when('/edit-drink/:param', {
            templateUrl: '_edit_drink.html',
            controller: 'editDrink'
        }).
        when('/add-food', {
            templateUrl: '_add_food.html',
            controller: 'addFood'
        }).
        when('/edit-food/:param', {
            templateUrl: '_edit_food.html',
            controller: 'editFood'
        }).
        when('/', {
            templateUrl: '_home.html',
            controller: 'myCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

app.controller('myCtrl', ['$scope', function($scope) {

}]);

app.controller('addDrink', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    // CREATE A FIREBASE REFERENCE
    var ref = new Firebase("https://magic-roa.firebaseio.com/drinks/");

    // GET DRINKS AS AN ARRAY
    $scope.drinks = $firebaseArray(ref);

    // ADD DRINK
    $scope.addDrink = function() {

        //LISTEN FOR RETURN KEY
        if ($scope.drinkName) {

            //console.log("Drink name: " + $scope.drinkName);

            // ADD TO FIREBASE
            $scope.drinks.$add({
                name: $scope.drinkName,
                qty: 'null'
            });

            // RESET DRINK INPUT
            $scope.drinkName = "";
        }

    };

    // REMOVE DRINK
    $scope.removeDrink = function(k) {
        //console.log("Drink ID: " + k);
        $scope.drinks.$remove(k);
    };
}]);

app.controller('editDrink', ['$scope', "$routeParams", "$firebaseObject", "$location", function($scope, $routeParams, $firebaseObject, $location) {

    var urlParam = $routeParams.param;

    // CREATE A FIREBASE REFERENCE
    var url = "https://magic-roa.firebaseio.com/drinks/" + urlParam;
    var ref = new Firebase(url);

    // GET DRINKS AS AN ARRAY
    $scope.drinkName = $firebaseObject(ref);

    $scope.updateDrink = function() {

        //LISTEN FOR RETURN KEY
        if ($scope.drinkName) {

            $scope.drinkName.$save({
                name: $scope.drinkName,
                qty: 'null'
            });

            $location.path("/add-drink").search();

        }
    };

}]);

app.controller('addFood', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    // CREATE A FIREBASE REFERENCE
    var ref = new Firebase("https://magic-roa.firebaseio.com/foods/");

    // GET DRINKS AS AN ARRAY
    $scope.foods = $firebaseArray(ref);

    // ADD DRINK
    $scope.addFood = function() {

        //LISTEN FOR RETURN KEY
        if ($scope.foodName) {

            //console.log("Drink name: " + $scope.drinkName);

            // ADD TO FIREBASE
            $scope.foods.$add({
                name: $scope.foodName,
                qty: 'null'
            });

            // RESET DRINK INPUT
            $scope.foodName = "";
        }

    };

    // REMOVE DRINK
    $scope.removeFood = function(k) {
        //console.log("Drink ID: " + k);
        $scope.foods.$remove(k);
    };
}]);

app.controller('editFood', ['$scope', "$routeParams", "$firebaseObject", "$location", function($scope, $routeParams, $firebaseObject, $location) {

    var urlParam = $routeParams.param;

    // CREATE A FIREBASE REFERENCE
    var url = "https://magic-roa.firebaseio.com/foods/" + urlParam;
    var ref = new Firebase(url);

    // GET DRINKS AS AN ARRAY
    $scope.foodName = $firebaseObject(ref);

    $scope.updateFood = function() {

        //LISTEN FOR RETURN KEY
        if ($scope.foodName) {

            $scope.foodName.$save({
                name: $scope.foodName,
                qty: 'null'
            });

            $location.path("/add-food").search();

        }
    };

}]);