const express = require('express');
router =  express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day')
var Place = require('../../models/place');
var Promise = require('bluebird');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/:id', function(req, res, next){
    Day.findAll({ where : {
        number: req.params.id
        },
        include: [{
            model: Activity
        },{ 
            model: Restaurant
        },{
            model: Hotel
        }]
    })
    .then(function(days){
        res.send(days)
    })
    .catch(function(err){
        console.log(err);
    })
})

// router.post('/:id', function(req, res, next){
//     Day.create(number: req.body.dayNum)
// })

router.post('/:id/restaurants', function(req, res, next){
    Day.findOrCreate({ where : {
        number: req.params.id
        }
    }).then(function([day]){
        console.log("REQ BODY ", req.body.name);
        console.log("DAY", day)
        Restaurant.findOne({
            
            where: {
                name: req.body.name
            }
        }).then(function(restaurant){
            console.log("RESTAURANT ", restaurant)
            day.addRestaurant(restaurant)
        })
        
    })
})

// router.post('/api/days/:id/activities', function(req, res, next){
    
// })

// router.post('/api/days/:id/hotel', function(req, res, next){
    
// })

 module.exports = router;