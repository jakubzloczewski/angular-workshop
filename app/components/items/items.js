(function () {
    "use strict";

    angular.module('feb27.items', [])
        .controller('ItemListController',
        ['$scope', 'Items', function ($scope, Items) {
            
            $scope.date = new Date();
            $scope.items = [];
            
            Items.query(function (items) {
                $scope.items = items;
            });

            $scope.addItem = function (item, isValid) {
                if (isValid) {
                    Items.save(item, function (response) {
                        $scope.items.push(response)
                    });
                } else {
                    alert('Invalid');
                }
            }
        }])
        .directive('itemList', function () {
            return {
                restrict: 'E',
                templateUrl: './components/items/ItemList.html',
                controller: 'ItemListController'
            };
        })
        .directive('itemForm', function () {
            return {
                restrict: 'E',
                templateUrl: './components/items/ItemForm.html',
                controller: 'ItemListController'
            };
        });

})();