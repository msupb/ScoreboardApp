// Edit controller --> Edit a scoreboard
app.controller('editCtrl', ['$http', '$scope', '$routeParams', '$location', '$route', function($http, $scope, $routeParams, $location, $route, index){
  $http.get('/api/scoreBoard/' + $routeParams.id)
  .success(function(data){
    $scope.data = data;
  })
  .error(function(data){
    console.log('Error: ' + data);
  });


  // Edit a person in the scoreboard
  $scope.editPerson = function(index){
    $scope.editPersonId = $scope.data.person[index]._id;
    $scope.editPersonName = $scope.data.person[index].name;
    $scope.editPersonWins = $scope.data.person[index].wins;
    $scope.editPersonLosses = $scope.data.person[index].losses;
    $('#editingModal').appendTo("body").modal('show');
  };


  // Update person function
  $scope.updatePerson = function(){
    // Send a PUT request and update the user
    $http.put('/api/scoreBoard/' +  $routeParams.id + '/' + $scope.editPersonId + '/' + $scope.editPersonName + '/' + $scope.editPersonWins + '/' + $scope.editPersonLosses)
    .success(function(){
        $route.reload();
    })
    .error(function(){
      console.log('Error: Failed to edit person.');
    });
  };


  // Delete a person in the scoreboard
  $scope.deletePerson = function(personId, index){
    $http.delete('/api/scoreBoard/' + $routeParams.id + '/' + personId)
    .success(function(){
      $scope.data.person.splice(index,1);
    })
    .error(function(){
      console.log('Error: Failed to delete person.');
    });
  };


  // Add person modal
  $scope.addPersonModal = function(){
    $('#addingModal').appendTo("body").modal('show');
  };

  // Add a person to an existing scoreboard
  $scope.personName;
  $scope.personWins;
  $scope.personLosses;
  $scope.addPerson = function(){
    $scope.data.person.push(
      {
        "name" : String($scope.personName),
        "wins" : parseInt($scope.personWins),
        "losses" : parseInt($scope.personLosses)
      }
    );

    // Make a POST request and insert the new person
    $http.post('/api/scoreBoard/person/' +  $routeParams.id + '/' + $scope.personName + '/' + $scope.personWins + '/' + $scope.personLosses)
    .success(function(){
      console.log('Success: Added a person.');
    })
    .error(function(){
      console.log('Error: Failed to add person.');
    });

    // Reset input data
    $scope.personName = '';
    $scope.personWins = null;
    $scope.personLosses = null;
  };
}]);
