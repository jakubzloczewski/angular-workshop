(function(){
    "use strict";

    angular.module('fakeApi', ['ngMockE2E'])
        .run(function ($httpBackend){
            var items = [{
                name: 'Hat',
                amount: 2,
                createdAt: 1425031026793
            }, {
                name: 'Shoes',
                amount: 1,
                createdAt: 1425021126793
            }, {
                name: 'Socks',
                amount: 5,
                createdAt: 1425031126793
            }];

            $httpBackend.whenGET('/api/items').respond(items);

            $httpBackend.whenGET(/^components/).passThrough();
        });
})();