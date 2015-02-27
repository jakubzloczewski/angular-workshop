/*jslint node: true */

var main = function () {
    "use strict";

    var express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        router = express.Router(),

        uuid = require('node-uuid'),

        merge = require('merge'),

        collectionPrototype = {
            getAll: function () {
                return this.data;
            },

            add: function (newItem) {
                this.data.push(merge(newItem, {
                    id: uuid.v1(),
                    createdAt: +new Date(),
                    modifiedAt: +new Date()
                }));
                return this;
            },

            remove: function (id) {
                this.data = this.data.filter(function (item) {
                    return item.id !== id;
                });

                return this;
            },

            update: function (updatedItem) {
                var item = this.getById(updatedItem.id),
                    index = this.data.indexOf(item);

                if (index > -1) {
                    this.data[index] = merge(item, updatedItem, {
                        createdAt: +new Date(item.createdAt),
                        modifiedAt: +new Date()
                    });
                }

                return this;
            },

            getById: function (id) {
                return this.data.filter(function (item) {
                    return item.id === id;
                })[0];
            }
        },

        items = merge({
            data: [
                {
                    id : uuid.v1(),
                    "type": "card",
                    "name": "STATOIL",
                    "categories": ['Fuel'],
                    "amount": "-100",
                    createdAt: Date.parse("February 1, 2015")
                },
                {
                    id : uuid.v1(),
                    "type": "card",
                    "name": "Paweł i Gaweł",
                    "categories": ['Food', 'Household chemical'],
                    "amount": "-100",
                    createdAt: Date.parse("February 3, 2015")
                },
                {
                    id : uuid.v1(),
                    "type": "card",
                    "name": "Bookstore",
                    "amount": "-540",
                    "categories": ['Multimedia', 'Books'],
                    createdAt: Date.parse("February 3, 2015")
                },
                {
                    id : uuid.v1(),
                    "type": "transfer",
                    "name": "discretionary bonus",
                    "amount": "4500",
                    "categories": ['Salary'],
                    createdAt: Date.parse("February 2, 2015")
                },
                {
                    id : uuid.v1(),
                    "type": "transfer",
                    "name": "Saving",
                    "amount": "-2000",
                    "categories": ['Regular saving'],
                    createdAt: Date.parse("February 4, 2015")
                },
                {
                    id : uuid.v1(),
                    "type": "internet",
                    "name": "Footlocker",
                    "amount": "-200",
                    "categories": ['Clothing'],
                    createdAt: Date.parse("February 5, 2015")
                }
            ]
        }, collectionPrototype)

    router.use(bodyParser.json());

    router.all('*', function (req, res, next) {
        res.type('application/json');

        setTimeout(function(){
            next();
        }, 1500);
    });

    router.get('/items', function (req, res, next) {
        res.send(JSON.stringify(items.getAll()));

        next();
    });

    router.post('/items', function (req, res, next) {
        var allIssues = items.add(req.body)
            .getAll();

        res.status(201);
        res.send(JSON.stringify(allIssues));

        next();
    });

    router.delete('/items/:id', function (req, res, next) {
        var allIssues = items.remove(req.params.id)
            .getAll();

        res.send(JSON.stringify(allIssues));

        next();
    });

    router.put('/items', function (req, res, next) {

        var allIssues = items.update(req.body)
            .getAll();

        res.send(JSON.stringify(allIssues));
        next();
    });

    app.use('/api', router);
    app.use('/static', express.static('./app/'));

    app.listen(3000);

};

main();