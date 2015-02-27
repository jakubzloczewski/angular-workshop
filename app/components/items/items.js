(function () {
    "use strict";

    angular.module('feb27.items', [])
        .controller('ItemListController',
        ['$scope', 'Items', function ($scope, Items) {
            Items.query(function (items) {
                $scope.items = items;
            });

            $scope.addItem = function (item) {
                var now = new Date(),
                    nowTimestamp = now.getTime();

                item.createdAt = nowTimestamp;

                $scope.items.push(item);
            }
        }]);

})();