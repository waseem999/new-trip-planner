const express = require('express');
router =  express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Place = require('../../models/place');
var Promise = require('bluebird');

// router.get('/', function(req, res, next) {

//   var findingHotels = Hotel.findAll({
//     include: [Place]
//   });

//   var findingActivities = Activity.findAll({
//     include: [Place]
//   });

//   var findingRestaurants = Restaurant.findAll({
//     include: [Place]
//   });

//   Promise.all([
//     findingHotels,
//     findingActivities,
//     findingRestaurants
//   ])
//   .spread(function(hotels, activities, restaurants) {
//     res.render('index', {
//       hotels: hotels,
//       activities: activities,
//       restaurants: restaurants
//     });
//   })
//   .catch(next);

// });

router.get('/hotels', function(req, res, next){
    var findingHotels = Hotel.findAll({
    include: [Place]
  }).then(function(hotels){
      res.send(hotels)
  })
  
});

router.get('/activities', function(req, res, next){
    var findingActivities = Activity.findAll({
    include: [Place]
  }).then(function(activities){
      res.send(activities)
  })
});

router.get('/restaurants', function(req, res, next){
      var findingRestaurants = Restaurant.findAll({
    include: [Place]
  }).then(function(restaurants){
      res.send(restaurants)
  })
});

module.exports = router;