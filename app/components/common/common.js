(function () {
    "use strict";

    angular.module('feb27.common', ['ngResource'])
        .service('Items', ['$resource', function ($resource) {
            return $resource('/api/items/:id');
        }])
        .filter('dateFrom', function(){
            return function(list, date){
                var newItems = [],
                    fromDate = date || 0;
                
                console.log(list)
                list.forEach(function(item){
                    if(item.createdAt > fromDate){
                        newItems.push(item);
                    }
                });
                
                return newItems;
            }
        });

})();