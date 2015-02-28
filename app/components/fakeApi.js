(function(){
    "use strict";

    angular.module('fakeApi', ['ngMockE2E'])
        .run(function ($httpBackend){
            var items = [{
                name: 'Hat',
                amount: 2,
                createdAt: 1423009026793
            }, {
                name: 'Shoes',
                amount: 1,
                createdAt: 1424010126793
            }, {
                name: 'Socks',
                amount: 5,
                createdAt: 1425031126793
            }];

            $httpBackend.whenGET('/api/items').respond(items);


            $httpBackend.whenPOST('/api/items/checkNameUniqueness').respond(function(method, url, data){
                var itemToCheck = angular.fromJson(data);
                var response = {
                    error : false
                };

                items.forEach(function(item){
                    if(item.name === itemToCheck.name){
                        response.error = true;
                        response.message = 'Already used';
                    }
                });
                
                return [200, response, {}];
            });
            
            $httpBackend.whenPOST('/api/items').respond(function(method, url, data){
                
                var newItem = angular.fromJson(data);

                newItem.createdAt = +new Date();
                
                return [200, newItem, {}];
            });

            $httpBackend.whenGET(/^\.\/components/).passThrough();
        });
})();