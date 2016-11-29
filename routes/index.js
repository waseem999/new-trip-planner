var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Place = require('../models/place');
var Promise = require('bluebird');
var apirouter = require('./api/attractions');
var dayrouter = require('./api/day')

router.get('/', function(req, res, next) {

  var findingHotels = Hotel.findAll({
    include: [Place]
  });

  var findingActivities = Activity.findAll({
    include: [Place]
  });

  var findingRestaurants = Restaurant.findAll({
    include: [Place]
  });

  Promise.all([
    findingHotels,
    findingActivities,
    findingRestaurants
  ])
  .spread(function(hotels, activities, restaurants) {
    res.render('index', {
      hotels: hotels,
      activities: activities,
      restaurants: restaurants
    });
  })
  .catch(next);

});

router.use('/api/days', dayrouter);
router.use('/api', apirouter);



module.exports = router;
