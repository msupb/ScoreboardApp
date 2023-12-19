// Server files and all CRUD-operations for scoreApp
// Get dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Schema = mongoose.Schema;


// Connect to database
mongoose.connect('mongodb://localhost/test');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(methodOverride());


// MongoDB Schema Layout
var scoreBoardSchema = new Schema({
  id: Number,
  boardName: String,
  created_at: Number,
  person: [
        {
          name: String,
          wins: Number,
          losses: Number
        }
      ]
});
mongoose.model('scoreBoard', scoreBoardSchema);



// Get all scoreboard data
app.get('/api/scoreBoard', function(req, res) {
  mongoose.model('scoreBoard').find(function(err, items) {
    res.json(items);
  });
});



// Get scoreboard data from a specific scoreboard
app.get('/api/scoreBoard/:id', function(req, res) {
  mongoose.model('scoreBoard').findById(req.params.id, function(err, items) {
    res.json(items);
  });
});



// Create a new scoreboard
app.post('/api/scoreBoard', function(req, res) {
   mongoose.model('scoreBoard').create(
    {
      boardName: req.body.boardName,
      created_at: req.body.created_at,
      person: req.body.person,
      name: req.body.person.name,
      wins: req.body.person.wins,
      losses: req.body.person.losses
    },
    function(err, item) {
      mongoose.model('scoreBoard').find(function(err, items) {
        res.json(items);
      });
    });
});



// Update a specific scoreboard
app.put('/api/scoreBoard/:id', function(req, res) {
  mongoose.model('scoreBoard').findById(req.params.id, function(err, item) {
    if(!item) {
      return next(new Error('Unable to load document'));
    } else {
      mongoose.model('scoreBoard').update({_id:req.params.id}, req.body, function(err, item) {
        // Error handling
		if(!err) {
          res.json('Success: Scoreboard has successfully been updated.');
        } else {
          res.write('Error: Scoreboard failed to update.');
        }
      });
    }
  });
});



// Delete a specific scoreboard
app.delete('/api/scoreBoard/:id', function(req, res) {
  mongoose.model('scoreBoard').remove({
    _id: req.params.id
  }, function(err, item) {
      // Error handling
	  if(err) {
        res.send(err);
      }
      mongoose.model('scoreBoard').find(function(err, items) {
        // Error handling
		if(err){
          res.send(err);
        }
        res.json(items);
    });
  });
});



// Delete a specific person in a scoreboard by using the $pull command
app.delete('/api/scoreBoard/:scoreboard/:id', function(req, res) {
  mongoose.model('scoreBoard').update(
    { '_id' : req.params.scoreboard },
    { $pull: { "person" : { _id : req.params.id} } }, function(err){
      // Error handling
	  if(!err) {
        res.json('Success: Person was successfully deleted.');
      } else {
        res.write('Error: Person failed to be deleted.');
      }
    });
});



// Add a person to an already existing scoreboard by using the $push command
app.post('/api/scoreBoard/person/:id/:name/:wins/:losses', function(req, res) {
  // New values
  var nameNew = req.params.name;
  var winsNew = req.params.wins;
  var lossesNew = req.params.losses;

  mongoose.model('scoreBoard').update(
    { '_id' : req.params.id },
    { $push: { "person" : { name: nameNew, wins : winsNew, losses: lossesNew } } }, function(err){
      if(!err) {
        res.json('Success: Person was successfully added.');
      } else {
        res.write('Error: Person failed to be added.');
      }
    });
});



// Edit person in an already existing scoreboard by using the $set command
app.put('/api/scoreBoard/:scoreboard/:person_id/:name/:wins/:losses', function(req, res) {
  mongoose.model('scoreBoard').update(
    { '_id' : req.params.scoreboard, 'person._id' : req.params.person_id },
    { '$set': { 'person.$.name' : req.params.name, 'person.$.wins' : req.params.wins, 'person.$.losses' : req.params.losses } }, function(err){
      // Error handling
	  if(!err) {
        res.json('Success: Person was successfully edited.');
      } else {
        res.write('Error: Person failed to be edited.');
      }
    });
});



// Load the single view file
app.get('*', function(req, res) {
  res.sendFile('public/index.html', {root : __dirname});
});



// Start the server on port 3000
app.listen(3000, function() {
  console.log('Server started!');
  console.log('Server is running on: http://localhost:3000');
});
