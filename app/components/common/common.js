(function () {
    "use strict";

    angular.module('feb27.common', ['ngResource'])
        .service('Items', ['$resource', function ($resource) {
            return $resource('/api/items/:id');
        }])
        .directive('gtThan', [function () {
            return {
                require: 'ngModel',
                link: function (scope, elem, attr, ngModel) {

                    ngModel.$validators.gtThan = function(viewValue){
                        return parseInt(viewValue,10) > parseInt(attr.gtThan, 10);
                    };

                }
            };
        }])
        .directive('itemNameUniqueness', ['$http', '$q', function ($http, $q) {
            return {
                require: 'ngModel',
                link: function (scope, elem, attr, ngModel) {

                    ngModel.$asyncValidators.itemNameUniqueness = function (name) {
                        return $http.post('/api/items/checkNameUniqueness', {name: name})
                            .then(function (response) {

                                if (response.data.error) {
                                    return $q.reject(response.data.message);
                                }

                                return true;
                            });
                    };
                }
            };
        }])
        .filter('dateFrom', function () {
            return function (list, date) {
                var newItems = [],
                    fromDate = date || 0;

                list.forEach(function (item) {
                    if (item.createdAt > fromDate) {
                        newItems.push(item);
                    }
                });

                return newItems;
            };
        });

})();
