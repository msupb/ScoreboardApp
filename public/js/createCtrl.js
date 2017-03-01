// Create controller --> Create a scoreboard
app.controller('createCtrl', ['$http', '$scope', '$location', function($http, $scope, $location){
  // Set scoreboard name
  $scope.setScoreName = function(){
    // Variable that contains the current date and time
    $scope.dateNow = new Date().getTime();

    // Variable that contains the name of the scoreboard
    $scope.scoreboardName;
    if (!$scope.scoreboardName){
      $scope.scoreboardName = 'Untitled Scoreboard';
    }

    // Disable / Enable form inputs
    $('.boardNameButton').hide();
    $('.boardNameInput').prop('disabled', true);
    $('.toggleDisable').show();

    // Initialize the scoreboard
    $scope.peopleList = {
      "created_at" : $scope.dateNow,
      "boardName" : $scope.scoreboardName,
      "person" : []
    };
  };

  // Add a person to the scoreboard
  $scope.personName;
  $scope.personWins;
  $scope.personLosses;
  $scope.addPerson = function(peopleList) {
    $scope.peopleList.person.push(
      {
        "name" : String($scope.personName),
        "wins" : parseInt($scope.personWins),
        "losses" : parseInt($scope.personLosses)
      }
    );

    // Reset person attributes
    $scope.personName = '';
    $scope.personWins = null;
    $scope.personLosses = null;
  };


  // Delete a person from the preview scoreboard
  $scope.deletePerson = function(index){
    $scope.peopleList.person.splice(index, 1);
  }


  // Insert scoreboard to database
  $scope.createScoreboard = function(peopleList){
    $http.post('/api/scoreBoard', $scope.peopleList)
    .success(function(data){
      $scope.people = data;
      $scope.createResult = 'Scoreboard was successfully created!';
      $location.path('/scoreboards');
    })
    .error(function(data){
      $scope.createResult = 'Scoreboard failed to be created!';
    });

    // Show modal when clicking 'Create Scoreboard'
    $('#createModal').appendTo("body").modal('show');
  };
}]);
