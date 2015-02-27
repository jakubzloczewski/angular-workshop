(function () {
    "use strict";

    angular.module('feb27.common', ['ngResource'])
        .service('Items', ['$resource', function ($resource) {
            return $resource('/api/items/:id');
        }]);

})();